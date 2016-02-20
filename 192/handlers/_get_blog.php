<?
define('WP_USE_THEMES', false);
require('../_cms/wp-load.php'); 

if(isset($_POST['submit'])){
	//POST IMAGES
	$postPerPage = htmlspecialchars(trim($_POST['postPerPage']));
	$titlePost = array();
	$imagePost = array();
	$ids = array(); 
	$slug = array(); 
	
	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'numberposts'    => $postPerPage,
	);
	
	$blogPosts = get_posts( $args );
	if ( $blogPosts ) {
		foreach ( $blogPosts as $blogPost ) {
			//setup_postdata($blogPost);
			$titlePost[] = $blogPost->post_title;
			$imagePost[] = get_the_post_thumbnail($blogPost->ID);
			$ids[] = $blogPost->ID;	
			$slug[] = $blogPost->post_name;	
		}
	}
	
	echo json_encode(array('imagePost' => $imagePost, 'titlePost' => $titlePost, 'gridSize' => $gridSize, 'ids' => $ids, 'post_name' => $slug));
}
?>