<?php 
/*
Template name: Proyectos-Filtros
*/
	// GET TYPE FILTER
	$orderBy = $_POST["orderBy"];
	$order = $_POST["order"];	
	$type = $_POST["type"];	

	$temp = $wp_query; 
	$wp_query = null;
	$args = array('posts_per_page' => -1, 'post_type' => 'proyectos', 'orderby'=> $orderBy, 'order' => $order); 
	$wp_query = new WP_Query(); 
	$wp_query->query($args);
	$postsBy;
	$postsColumns;
	$postsLinks;
	$postsIDs;
	$postsTitles;

	switch ($type) {
		case 'crono':
			//HAVE POST
			if ($wp_query->have_posts()): 
				while ($wp_query->have_posts()) : $wp_query->the_post();
					$th = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
					$postsBy[get_the_date('Y')] = $postsBy[get_the_date('Y')]."#".$th;
					$postsIDs[get_the_date('Y')] = $postsIDs[get_the_date('Y')]."#".$post->ID;
					$postsLinks[get_the_date('Y')] = $postsLinks[get_the_date('Y')]."#".get_permalink($post->ID);
					$postsColumns[get_the_date('Y')] = get_the_date('Y');
					$title = get_the_title();
				   	$postsTitles[get_the_date('Y')] = $postsTitles[get_the_date('Y')]."#".get_the_title();
				endwhile;	
			endif;
		break;
		case 'alfa':
			//HAVE POST
			if ($wp_query->have_posts()): 
				while ($wp_query->have_posts()) : $wp_query->the_post();
					$title = get_the_title();
					$th = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
			   		$postsBy[$title[0]] = $postsBy[$title[0]]."#".$th;
			   		$postsIDs[$title[0]] = $postsIDs[$title[0]]."#".$post->ID;
			   		$postsLinks[$title[0]] = $postsLinks[$title[0]]."#".get_permalink($post->ID);
			   		$postsColumns[$title[0]] = $title[0];
			   		$title = get_the_title();
				   	$postsTitles[$title[0]] = $postsTitles[$title[0]]."#".get_the_title();
				endwhile;	
			endif;
		break;
		case 'programa':
			//HAVE POST
			if ($wp_query->have_posts()): 
				while ($wp_query->have_posts()) : $wp_query->the_post();
					$category = get_the_category();
					$th = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
			   		$postsBy[$category[0]->cat_name] = $postsBy[$category[0]->cat_name]."#".$th;
			   		$postsIDs[$category[0]->cat_name] = $postsIDs[$category[0]->cat_name]."#".$post->ID;
			   		$postsLinks[$category[0]->cat_name] = $postsLinks[$category[0]->cat_name]."#".get_permalink($post->ID);
			   		$postsColumns[$category[0]->cat_name] = array($category[0]->cat_name, $category[0]->description);
			   		$title = get_the_title();
				   	$postsTitles[$category[0]->cat_name] = $postsTitles[$category[0]->cat_name]."#".get_the_title();
				endwhile;	
			endif;
		break;
	}
	//GET Projects By Date
	$newRows;
	$newCols;
	$newCols;
	$newThs;
	$newThLinks;
	$newThTitles;
	//TITULOS
	$ColumnsTmp; 
	foreach ($postsColumns as $t => $postsColumn ) {
		$ColumnsTmp[] = $postsColumn;
	}
	//
	if ($postsBy) {
		$col = 1;
		$colN = 1;
		$hCol;
		foreach ($postsBy as $k => $posts ) {
			$hCol[] = $ColumnsTmp[$colN-1];
			$ths = split('#', $posts);
			$links = split('#', $postsLinks[$k]);
			$ids = split('#', $postsIDs[$k]);
			$tits = split('#', $postsTitles[$k]);
			$r = 1;
			$h = 1;
			for ($i = 1; $i < count($ths); $i++){
				//if($type == "programa"){
					if($r > 8){
						$hCol[] = '';
						$r=1;
						$col++;
					}
				//}
				
				$newRows[] = $r;
				$newCols[] = $col;
				$newIds[] = $ids[$i];
				$newThs[] = $ths[$i];
				$newThLinks[] = $links[$i];
				$newThTitles[] = $tits[$i];

				$r++;
			}
			$colN++;
			$col++;
		}
	}

	echo json_encode(array('titles' => $newThTitles, 'links' => $newThLinks, 'ths' => $newThs,'newRows' => $newRows, 'newCols' => $newCols, 'newIds' => $newIds, 'columns' => $postsColumns, 'nC' => $col, 'hCol' => $hCol, 'typeFilter' => $type));

?>
