<?
define('WP_USE_THEMES', false);
require('../cms/wp-load.php'); 

if(isset($_POST['submit'])){
	$postSlug = htmlspecialchars(trim($_POST['postSlug']));

	//Menu
	$data_menu[] = array();
	
	//TWO HOME
	$menuid = $wpdb->get_var( "SELECT ID FROM $wpdb->posts WHERE post_name = '" . $postSlug . "'" );
	$menu = get_post($menuid);
	
	$id_menu = $menu->ID;
	
	$two = get_post_meta( $menu->ID, 'two', true);
	$que = get_post_meta( $menu->ID, 'que', true);
	$como = get_post_meta( $menu->ID, 'como', true);
	$categorias = get_post_meta( $menu->ID, 'categorias', true);
	$wildblog = get_post_meta( $menu->ID, 'wild_blog', true);
	$contacto = get_post_meta( $menu->ID, 'contacto', true);
	
	if($two){
		$data_menu[] = "two";
	}
	if($que){
		$data_menu[] = "que";
	}
	if($como){
		$data_menu[] = "como";
	}
	if($categorias){
		$data_menu[] = "categorias";
	}
	if($wildblog){
		$data_menu[] = "wildblog";
	}
	if($contacto){
		$data_menu[] = "contacto";
	}
	
	
	//OUTPUT
	$args_output = array(
		'two_menu'      => $data_menu
	);

	echo json_encode($args_output);

}
?>