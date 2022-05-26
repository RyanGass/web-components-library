<section id="slides-container" class="w-full mx-auto">
	<?php if( have_rows('slides') ): ?>
        <div id="slide-repeater">
            <?php $i = 1;  while ( have_rows('slides') ) : the_row(); if ($i >= 2) { $closed = 'closed'; }; ?>   
			<div id="slide-<?php echo $i ?>" class="slide-block pb-40 pt-40 lg:pt-72 <?php echo $closed ?>" style="background-image: url(<?php the_sub_field('image'); ?>)">   
				<div class="w-11/12 mx-auto area max-w-screen-2xl">
					<div class="flex flex-col justify-center max-w-screen-lg mx-auto text-center inner-area align-center">
						<span class="block my-8 quote-content"><?php the_sub_field('text_1'); ?></span>
						<span class="block quote-name"><?php the_sub_field('text_2'); ?></span>
						<span class="block quote-company"><?php the_sub_field('text_3'); ?></span>
					</div>
				</div>
            </div>
            <?php $i++; endwhile; ?>
			<ul id="slide-nav" class="slide-nav" style="display: block;" role="tablist"></ul>
        </div>
    <?php endif; ?>
</section>