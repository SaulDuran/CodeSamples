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
			$imagePost[] = wp_get_attachment_url( get_post_thumbnail_id($blogPost->ID) );
			$ids[] = $blogPost->ID;	
			$slug[] = $blogPost->post_name;	
			$date[] = mysql2date('M j, Y', $blogPost->post_date);
			$content[] = apply_filters ("the_content", $blogPost->post_content);
			$categories = get_the_category($blogPost->ID); 
			$category[] = $categories[0]->cat_name;
		}
	}
	
	echo json_encode(array('imagePost' => $imagePost, 'titlePost' => $titlePost, 'ids' => $ids, 'post_name' => $slug, 'post_date' => $date, 'content' => $content, 'category' => $category));
}
?>