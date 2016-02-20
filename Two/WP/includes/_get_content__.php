<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	$postSlug = htmlspecialchars(trim($_POST['postSlug']));
	$output_images = array();
	$output_images_pages = array();
	$pages_child = array();
	$pages_id = 0;
	
	
	$postid = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $postSlug . "'" );
	//$childPages = get_pages( array( 'child_of' => $post->ID, 'sort_column' => 'post_date', 'sort_order' => 'desc' ) );
	
	
	//POST CONTENT
	$post_content = get_post($postid);
	
	$id = $post_content->ID;
	$title = $post_content->post_title;
	$content = apply_filters ("the_content", $post_content->post_content);
	
	/* IMAGE SUBPAGES */
	
	$childPages = get_pages( array( 'child_of' => $id, 'sort_column' => 'menu_order' ) );
	if ( $childPages ) {
        foreach ( $childPages as $childPage ) {
			$output_images_pages[] = wp_get_attachment_url( get_post_thumbnail_id($childPage->ID) );
			$pages_child[] = $childPage->post_content;
        }
     }
	
	/* IMAGE PAGES */
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
	
	
	echo json_encode(array('id' => $id, 'title' => $title, 'content' => $content, 'pages' => $pages_child,'scr' => $output_images,'feat' => $output_images_pages));

}
?>