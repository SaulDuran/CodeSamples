<?
define('WP_USE_THEMES', false);
require('../_cms/wp-load.php'); 

if(isset($_POST['submit'])){
	//POST IMAGES
	$post = htmlspecialchars(trim($_POST['postId']));
	$output_images = array();
	
	
	$args = array(
	'order'          => 'ASC',
	'orderby'        => 'menu_order',
	'post_type'      => 'attachment',
	'post_parent'    => $post,
	'post_mime_type' => 'image',
	'post_status'    => null,
	'numberposts'    => -1,
	);
	
	
	$attachments = get_posts( $args );
     if ( $attachments ) {
        foreach ( $attachments as $attachment ) {
		   $output_images[] = wp_get_attachment_url( $attachment->ID);	
          }
     }
	 
	//POST CONTENT
	$post_content = get_post($post);
	
	$type = $post_content->post_type;
	$title = $post_content->post_title;
	$content = $post_content->post_content;
	
	$content = do_shortcode($content);
	
	echo json_encode(array('type' => $type, 'scr' => $output_images, 'title' => $title, 'content' => $content));
}
?>