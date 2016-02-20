<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	//POST IMAGES
	$postPerPage = htmlspecialchars(trim($_POST['postPerPage']));
	$titlePost = array();
	$imagePost = array();
	$ids = array(); 
	$slug = array();
	$date = array();
	$content = array();
	$category = array();
	$categories = array();
	
	$term = get_cat_ID('Categorias');
	
	
	$args = array(
		'category'      => $term,
		'post_status'    => 'publish',
		'numberposts'    => $postPerPage,
	);
	
	$blogPosts = get_posts( $args );
	if ( $blogPosts ) {
		foreach ( $blogPosts as $blogPost ) {
			//setup_postdata($blogPost);
			$titlePost[] = $blogPost->post_title;
			$imagePost[] = wp_get_attachment_url( get_post_thumbnail_id($blogPost->ID) );
			$ids[] = $blogPost->ID;	
			$slug[] = $blogPost->post_name;	
			
			$content[] = apply_filters ("the_content", $blogPost->post_excerpt);
		}
	}
	
	echo json_encode(array('imagePost' => $imagePost, 'titlePost' => $titlePost, 'ids' => $ids, 'post_name' => $slug, 'content' => $content));
}
?>