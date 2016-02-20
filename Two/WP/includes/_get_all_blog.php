<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	//POST IMAGES
	$postPerPage = -1;
	$titlePost = array();
	$output_images = array();
	$imagePost = array();
	$ids = array();
	$content = array();
	$slug = array(); 
	
	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'numberposts'    => $postPerPage,
	);
	
	$blogPosts = get_posts( $args );
	if ( $blogPosts ) {
		foreach ( $blogPosts as $blogPost ) {
			$args_img = array();
			$args_img = array(
				'order'          => 'ASC',
				'orderby'        => 'menu_order',
				'post_type'      => 'attachment',
				'post_parent'    => $blogPost->ID,
				'post_mime_type' => 'image',
				'numberposts'    => -1,
				'exclude'    	 => get_post_thumbnail_id($blogPost->ID)
			);
				
			$attachments = get_posts( $args_img );
			if ( $attachments ) {
				$output_images = array();
				foreach ( $attachments as $attachment ) {
					$output_images[] = wp_get_attachment_url( $attachment->ID);	
				}
			} else {
				$output_images = array();
			}
			
			$imagePost[] = $output_images;
			$titlePost[] = $blogPost->post_title;
			$ids[] = $blogPost->ID;
			$content[] = do_shortcode($blogPost->post_content);
			$slug[] = $blogPost->post_name;	
		}
	}
	
	echo json_encode(array('titlePost' => $titlePost, 'ids' => $ids, 'imagePost' => $imagePost, 'content' => $content, 'post_name' => $slug));
}
?>