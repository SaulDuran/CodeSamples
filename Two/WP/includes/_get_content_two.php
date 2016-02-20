<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	$postSlug = htmlspecialchars(trim($_POST['postSlug']));
	
	//IMAGES
	$id_images = array();
	$image_images = array();

	//PERSONAL
	$data_personal[] = array();
	$title_personal[] = array();
	$content_personal[] = array();
	$postura_personal[] = array();
	$imagen_personal[] = array();
	
	
	
	//TWO HOME
	$homeid = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $postSlug . "'" );
	$home_content = get_post($homeid);
	
	$id_home = $home_content->ID;
	$title_home = $home_content->post_title;
	$content_home = apply_filters ("the_content", $home_content->post_content);
	
	//TWO IMAGENES
	$args_personal = array(
		'order'          => 'ASC',
		'orderby'        => 'menu_order',
		'post_type'      => 'personal',
		'post_status'    => 'publish',
		
	);
	$args_images = array(
		'order'          => 'ASC',
		'orderby'        => 'menu_order',
		'post_type'      => 'personal-foto',
		'post_status'    => 'publish'
	);
	$images = get_posts( $args_images );
	$personal = get_posts( $args_personal );
	
	
	if ( $images ) {
		foreach ( $images as $image ) {
			$id_images[] = $image->ID;
			$image_images[] = array('imagen' => get_post_meta( $image->ID, 'wpcf-photo', true), 'id' => $image->ID);
		}
	}
	
	
	//TWO PERSONAL

	if ( $personal ) {
		foreach ( $personal as $persona ) {
			$paso_arr = array(
				'id'      	=> $persona->ID,
				'name'    	=> $persona->post_title,
				'desc'    	=> $persona->post_content,
				'postura'   => get_post_meta( $persona->ID, 'postura', true),
				'image'   	=> get_post_meta( $persona->ID, 'imagen', true),
			);
			$data_personal[] = $paso_arr;
		}
	}
	
	
	//OUTPUT
	$args_output = array(
		'two_home'      => $content_home,
		'two_personal'    => $data_personal,
		'two_imagen'    => $image_images,
	);

	echo json_encode($args_output);

}
?>