<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	$postSlug = htmlspecialchars(trim($_POST['postSlug']));
	$output_images = array();
	
	$postid = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $postSlug . "'" );
	
	$args = array(
	'order'          => 'ASC',
	'orderby'        => 'menu_order',
	'post_type'      => 'attachment',
	'post_parent'    => $postid,
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
	$post_content = get_post($postid);

	$title = $post_content->post_title;
	$content = $post_content->post_content;
	$categories = get_the_category($post_content->ID); 
	$category = $categories[0]->cat_name;
	$date = mysql2date('M j, Y', $post_content->post_date);
	
	$content = do_shortcode($content);
	
	echo json_encode(array('scr' => $output_images, 'title' => $title, 'content' => $content, 'category' => $category, 'date' => $date));

}
?>