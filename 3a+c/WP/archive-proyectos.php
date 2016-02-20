<?php
/*** Projects ***/
get_header(); ?>
<?php 
	$temp = $wp_query; 
	$wp_query = null;
	$args = array('posts_per_page' => -1, 'post_type' => 'proyectos', 'orderby'=> 'date', 'order' => 'DESC'); 
	$wp_query = new WP_Query(); 
	$wp_query->query($args);
	$postsBy;
	$postsYears;
	$postsLinks;
	$postsIDs;
	$postsTitles;
?>
<!-- Preloader -->
<div class="grid-loader-container">
	<div class="grid-loader">
		<div class="spinner2"></div>
	</div>
</div>	
<div class="row" id="gridster-row">
	<div id="arrow_l" class="arrow-proyectos"></div>
	<div id="arrow_r" class="arrow-proyectos"></div>
	<div class="grid-container">
		<div id="grid-container-mov" style="position: absolute;">
			<div class="gridster">
			    <ul class="ul-gridster">
				   	<?php 
					 //Show proyectos
				   	?>
			    </ul>
		  	</div><!-- /gridster -->
		  	<? $ulW = count($postsBy) * 59; ?>
		  	<div class="bar-title-columns" style="width:<?echo $ulW;?>px; margin:0 auto !important;">
				<div class="bar-title-columns-c" >
				
				</div>
			</div>
		</div>
  	</div>
</div><!-- /row -->

<div class="container-grid" id="filtros">
	<div class="row">
		<div class="col-xs-4 col-md-4 col-filtros">
			<div class="filtros_link" data-orderby="date" data-order="DESC" data-type="crono"><p>cronológicamente</p></div>
		</div>
		<div class="col-xs-4 col-md-4 col-filtros">
			<div class="filtros_link" data-orderby="title" data-order="ASC" data-type="alfa"><p>A-Z</p></div>
		</div>
		<div class="col-xs-4 col-md-4 col-filtros">
			<div class="filtros_link" data-orderby="title" data-order="ASC" data-type="programa"><p>programa</p></div>
		</div>
	</div>
</div><!-- /#filtros -->

<div class="container" id="proyectos-responsivos">
	<div class="row">
		<div class="titulo-proyecto titulo-proyectos-responsivos">
			<h1>Proyectos</h1>
		</div>
		<div class="line-top"></div>
	</div><!-- /row titulo -->
	
	<div class="row content-proyectos-responsivos">
	
	<?php $loop = new WP_Query( array( 'post_type' => 'proyectos', 'posts_per_page' => -1 ) ); ?> 
		<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
		<div class="col-xs-6">
			<a href="<?php the_permalink(); ?>">
				<img class="img-responsive" src="<? echo wp_get_attachment_url(get_post_thumbnail_id());?>">
				<div class="title-proyecto-container">
					<div class="title-proyecto-content">
						<h2><?php the_title(); ?></h2>
						<span class="title-mas-proyecto">+</span>
					</div>
				</div>
			</a>
		</div>
		
	<?php endwhile; wp_reset_query(); ?>
	</div>
</div>


<?php get_footer(); ?>