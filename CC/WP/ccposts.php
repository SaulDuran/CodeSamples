
<?php 
	$temp = $wp_query; 
	$wp_query = null; 
	$wp_query = new WP_Query(); 
	$wp_query->query('showposts=3'.'&paged='.$paged); 
?>	
<?php if ($wp_query->have_posts()): while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
	<div class="blog-post">
		<div class="blog-post-content">
			<div class="blog-post-content-title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></div>
			<div class="blog-post-content-data">
				<div class="blog-post-content-date"><?php the_time('F j, Y');?></div>
				<div class="blog-post-content-social">
					<div class="blog-post-content-social-icon">
						<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>" target='_blank'><img src="<?php echo get_template_directory_uri(); ?>/images/_fb_icon_small.png" alt=""/></a>
					</div>
					<div class="blog-post-content-social-icon">
						<a href="http://www.twitter.com/share?url=<?php the_permalink(); ?>&amp;text=<?php the_title(); ?>" target='_blank'><img src="<?php echo get_template_directory_uri(); ?>/images/_tt_icon_small.png" alt=""/></a>
					</div>
					<div class="blog-post-content-social-icon">
						<a class="ssba_pinterest_share" href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"><img src="<?php echo get_template_directory_uri(); ?>/images/_pt_icon_small.png" alt=""/></a>
					</div>
					<div class="blog-post-content-social-icon">
						<a href="https://plus.google.com/share?url=<?php the_permalink(); ?>" target='_blank'><img src="<?php echo get_template_directory_uri(); ?>/images/_go_icon_small.png" alt=""/></a>
					</div>
					<div class="blog-post-content-social-icon">
						<a href="mailto:?subject=<?php the_title(); ?>&amp;body=<?php the_permalink(); ?>" target='_blank'><img src="<?php echo get_template_directory_uri(); ?>/images/_mail_icon_small.png" alt=""/></a>
					</div>
				</div>
			</div>
		</div>
		<a href="<?php the_permalink(); ?>" rel="bookmark"><div class="blog-post-image" style="background: url(<? echo wp_get_attachment_url(get_post_thumbnail_id());?>) no-repeat center;"></div></a>
	</div>
<?php endwhile; ?>
<?php endif; ?>

<?php 
	$wp_query = null; 
	$wp_query = $temp;
?>