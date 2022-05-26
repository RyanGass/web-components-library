// Slider variables setup
let slides = document.querySelectorAll('.slide-block'); // Create an array of slides
let slideid = document.querySelector('.slide-block').id // Create an array of slide ids
let slideButtons = document.getElementsByClassName("slide-button"); // Create an array of slide nav buttons
let sliderPosition = 0; 
let position = 0;

// Create the slider button navigation
for(let i = 1; i <= slides.length; i++) {
    let slideWrapper = document.getElementById('slide-nav'); // Get the nav parent element
    if (i == 1) { slideActive = 'class="button-active slide-button"';} else { slideActive = 'class="slide-button"'; } // Add classes for initial active slide
    slideWrapper.insertAdjacentHTML('beforeend', '<li><button ' + slideActive + ' id="slide-button-' + i + '" aria-controls="slide-' + i + '" onClick="slideToggle(this)"></button></li>'); // Create the button elements inside the slide-nav
    slideActive = ''; // Reset the active slide variable to stop from adding the active class to all elements in the loop
}

// Function triggered when the slide button element is clicked. 
// Handles slide transitions and toggling button active states
function slideToggle(id) {
    let sliderButtonId = document.getElementById(id.getAttribute("id")).id; // Get the id of the clicked button
    let sliderPositionSlice = sliderButtonId.slice(-1); // Slice the last character of the id and save in a new variable
    position = sliderPositionSlice -= 1; // Need to reset position to match the current "clicked" position - This value is then used by Next()
    sliderPosition = position; // Need to reset sliderPosition to match the current "clicked" position - This value is then used by Next()
    for(let i = 1, s = 0; i <= slides.length; i++, s++) { // setup dual for loop variables and conditions
        slides[s].classList.add('closed'); // add "closed" class to all slides
        document.getElementById(id.getAttribute("aria-controls")).classList.remove('closed'); // remove "close" class from the in focus slide - aria-controls set to the id of the slide.
        document.getElementById('slide-button-' + i).classList.remove('button-active'); // Remove focus from current button 
        document.getElementById(id.getAttribute("id")).classList.add('button-active'); // Add focus to newly clicked button
    }
}

// Transition slides
function hideSlide() {
    slides[position].classList.remove('closed'); // Show the new slide
    for (let i = 0; i < slides.length; i++) {
        if (i !== position) slides[i].classList.add('closed'); // Hide the current slide
    }
}

// Check current slide position and how to set the next slide
function control() {
    if (position >= 0 && position < slides.length) { // Current position is not first and not last
        hideSlide();
    } else if (position === slides.length) { // Current slide position is last
        position = 0; // Reset position to first slide
        hideSlide();
    } else {
        // There is no else
    }
}

// Transition active button
function buttonToggle() {
    slideButtons[sliderPosition].classList.add('button-active');
    for (let s = 0; s < slides.length; s++) {
        if (s !== sliderPosition) slideButtons[s].classList.remove('button-active');
    }
}

// Check active button position and how to set the next button
function buttonControl() {
    if (sliderPosition >= 0 && sliderPosition < slides.length) { // Current position is not first and not last
        buttonToggle();
    } else if (sliderPosition === slides.length) { // Current active button position is last
        sliderPosition = 0; // Reset position to first slide
        buttonToggle();
    } else {
        // There is no else
    }
}

// Previous can be used if creating prev/next buttons
// <button type="button" @click="Prev()" class="button">&lt; Previous</button>
    // function Prev() {
    // 	position--;
    // 	control();
    // 	buttonControl()
    // }

// Parent function to advance slides and slide buttons
// <button type="button" @click="Next()" class="button">Next</button>
function Next() {
    position++; // Advances counter to target the next slide
    sliderPosition++; // Advances counter to target next slide button
    control(); // Advance the active slide
    buttonControl() // Advance the active slide button
}

// Create a timer that calls Next() every 5 seconds
var myTimer = setInterval(Next, 5000);

// Pause the slider when on mouseover
source = document.getElementById('slides-container');
source.addEventListener("mouseover", function(){ clearInterval(myTimer)});

// Start a new timer on mouse out
source.addEventListener("mouseout", function(){ myTimer = setInterval(Next, 5000);});