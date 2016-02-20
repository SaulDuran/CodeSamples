<?php get_header(); ?>
	
	
	
	
	<main role="main" id="content-wrapper">
		
		<!-- HOME -->
		<section id="home" class="scro">
			<div id="slidesContainer">
				<div class="slideItem_first" id="slide_1"><img src="<?php echo get_template_directory_uri(); ?>/images/circle_w.png" alt=""/></div>
				<div class="slideItem" id="slide_2"><img src="<?php echo get_template_directory_uri(); ?>/images/circle_w.png" alt=""/></div>
				<div class="slideItem" id="slide_3"><img src="<?php echo get_template_directory_uri(); ?>/images/circle_w.png" alt=""/></div>
				<div class="slideItem" id="slide_4"><img src="<?php echo get_template_directory_uri(); ?>/images/circle_w.png" alt=""/></div>
				<div class="slideItemArrow" id="slide_down"></div>
				
			</div>
			<div id="scrolldown"><img src="<?php echo get_template_directory_uri(); ?>/images/_scroll_legend.png" alt=""/></div>
			<div id="max">
				<div id="home_0"></div>
				<div id="home_1"></div>
				<div id="home_2"></div>
				<div id="home_3"></div>
				<?php
					//echo "<img src='".wp_get_attachment_url(5)."' />";
				?>		
				
			</div>	
		</section>
		
		
		
		
		<!-- COLORCASE -->
		<section id="colorcase">
			<div class="container">
				<div class="section_title_sec"><img src="<?php echo get_template_directory_uri(); ?>/images/_title_section_colorcase.png" alt=""/></div>
				<div class="colorcase_container">
				<? 
					$page = get_page_by_title( 'ColorCase' );
					echo do_shortcode($page->post_content); 
				
				?>
				</div>
				
			</div>
		</section>	
		
		<div class="prelo">
			<img src="<?php echo get_template_directory_uri(); ?>/images/_home_0.jpg" alt=""/>
			<img src="<?php echo get_template_directory_uri(); ?>/images/_home_1.jpg" alt=""/>
			<img src="<?php echo get_template_directory_uri(); ?>/images/_home_2.jpg" alt=""/>
			<img src="<?php echo get_template_directory_uri(); ?>/images/_home_3.jpg" alt=""/>
		</div>
		
		
		<!-- SERVICIOS -->
		<section id="servicios" class="scro">
			<div class="container">
				<div class="section_title_sec" id="servicios_t"><img src="<?php echo get_template_directory_uri(); ?>/images/_title_section_servicios.png" alt=""/></div>
				<div id="serv_cont">
					<!-- PURIFYING -->
					<div class="three columns">
						<!-- OVERLAY -->
						<div class="serv-overlay-hover">
							<div class="serv-overlay" id="purifying">
								<? 
									$page = get_page_by_title( 'PurifyingDet' );
									echo do_shortcode($page->post_content); 
								?>
								
								
							</div>
						</div>
						<!-- SERVICIO -->
						<div class="serv_intro">
							<? 
								$page = get_page_by_title( 'Purifying' );
								echo do_shortcode($page->post_content); 
							?>
							<div class="serv_info"><img src="<?php echo get_template_directory_uri(); ?>/images/_mas_informacion.png" alt=""/></div>
						</div>
					</div>
				
					<!-- DEEP -->
			
					<div class="three columns">
						<!-- OVERLAY -->
						<div class="serv-overlay-hover">
							<div class="serv-overlay" id="deep">
								<? 
									$page = get_page_by_title( 'DeepDet' );
									echo do_shortcode($page->post_content); 
								?>
								
							</div>
						</div>
						<!-- SERVICIO -->
						<div class="serv_intro">
							<? 
								$page = get_page_by_title( 'Deep' );
								echo do_shortcode($page->post_content); 
							?>
							<div class="serv_info"><img src="<?php echo get_template_directory_uri(); ?>/images/_mas_informacion.png" alt=""/></div>
						</div>	
					</div>
				
					<!-- RELAXING -->
				
					<div class="three columns">
						<!-- OVERLAY -->
						<div class="serv-overlay-hover">
							<div class="serv-overlay" id="relaxing">
								<? 
									$page = get_page_by_title( 'RelaxingDet' );
									echo do_shortcode($page->post_content); 
								?>
								
							</div>
						</div>
						<!-- SERVICIO -->
						<div class="serv_intro">
							<? 
								$page = get_page_by_title( 'Relaxing' );
								echo do_shortcode($page->post_content); 
							?>
							<div class="serv_info"><img src="<?php echo get_template_directory_uri(); ?>/images/_mas_informacion.png" alt=""/></div>
						</div>
					</div>
					
					
					
				</div>
			</div>
		</section>
		
		<!-- MAS SERVICIOS -->
		<section id="masservicios">
			<div class="container">
				<div class="mas_container">
					<div class="section_title">Más servicios</div>
						<div class="os_icon_five">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_esmalte_icon.jpg" alt=""/></div>
							<div class="os_tx">cambio de esmalte</div>
							<div class="os_price">$115</div>
						</div>
						<div class="os_icon_five">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_gel_icon.jpg" alt=""/></div>
							<div class="os_tx">aplicación de gel</div>
							<div class="os_price">$150</div>
						</div>
						<div class="os_icon_five">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_gel_remove_icon.jpg" alt=""/></div>
							<div class="os_tx">retiro de gel</div>
							<div class="os_price">$80</div>
						</div>
						<div class="os_icon_five">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_design_icon.jpg" alt=""/></div>
							<div class="os_tx">diseño de uñas</div>
							<div class="os_price">$20 - $40 c/u</div>
						</div>
						<div class="os_icon_five">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_nail_icon.jpg" alt=""/></div>
							<div class="os_tx">arreglo de uña</div>
							<div class="os_price">$20 c/u</div>
						</div>
						
					</div>
				</div>
			</div>
		</section>
		
		
		
		
		<!-- PAQUETES -->
		<section id="paquetes" class="scro">
			<div class="container">
				<div class="section_title_big">Paquetes</div>
				<div class="paquetes_container">
					<? 
						$page = get_page_by_title( 'Paquetes' );
						echo do_shortcode($page->post_content); 
					?>
				</div>
				
			</div>
		</section>
		
		<!-- OTROS SERVICIOS -->
		<section id="oservicios">
			<div class="container">
				<div class="os_container_other">
					<div class="section_title">Otros servicios</div>
					<div class="os_icons_container">
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_1_icon.png" alt=""/></div>
							<div class="os_tx">depilación bozo</div>
							<div class="os_price">$90</div>
						</div>
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_2_icon.png" alt=""/></div>
							<div class="os_tx">depilación axila</div>
							<div class="os_price">$170</div>
						</div>
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_3_icon.png" alt=""/></div>
							<div class="os_tx">depilación bikini</div>
							<div class="os_price">$300</div>
						</div>
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_4_icon.png" alt=""/></div>
							<div class="os_tx">depilación pierna</div>
							<div class="os_price">$570</div>
						</div>
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_5_icon.png" alt=""/></div>
							<div class="os_tx">depilación 1/2 pierna</div>
							<div class="os_price">$370</div>
						</div>
						<div class="os_icon">
							<div class="os_icon_img"><img src="<?php echo get_template_directory_uri(); ?>/images/_otro_6_icon.png" alt=""/></div>
							<div class="os_tx">mascarilla facial</div>
							<div class="os_price">$100</div>
						</div>
					
					</div>
				</div>
			</div>
		</section>
		
		
			
		
		<!-- BLOG -->
		<section id="blog" class="scro">
			<div class="container">
				<div class="blog-container">
					<!-- LEFT COLUMN -->
					<div class="blog-left">
						<div class="blog-title"><img src="<?php echo get_template_directory_uri(); ?>/images/_blog_title.png" alt=""/></div>
						<div id="blog-posts">
							<?php get_template_part('ccposts'); ?>
						</div>
					</div>
					<!-- RIGHT COLUMN -->
					<div class="blog-right">
						<!-- PROMOCIONES -->
						<div class="blog-right-block">
							<div class="blog-title">Promociones</div>
							<div class="blog-right-block-cont" id="blog-promo"><img src="<?php echo get_template_directory_uri(); ?>/images/banners/_promo_mom.jpg" alt=""/></div>
						</div>
					
						<!-- CITAS -->
						<div class="blog-right-block">
							<div class="blog-title">CITAS</div>
							<div class="blog-right-block-cont" id="blog-citas"><a class="fancybox" href="#inline1"><img src="<?php echo get_template_directory_uri(); ?>/images/banners/_citas.png" alt=""/></a></div>
						</div>
						<!-- FAQ'S -->
						<div class="blog-right-block">
							<div class="blog-title">faq's</div>
							<div class="blog-right-block-cont" id="blog-faqs">
								<div class="faqs-container">
									<? 
										$page = get_page_by_title( 'FAQS' );
										echo do_shortcode($page->post_content); 
									?>
								</div>
							
							</div>
						</div>
						<!-- CONTACTO -->
						<div class="blog-right-block">
							<div class="blog-title">Contacto</div>
							<div class="blog-right-block-cont" id="blog-contacto"><img src="<?php echo get_template_directory_uri(); ?>/images/banners/_contacto.jpg" alt=""/></div>
						</div>
						<!-- SIGUENOS -->
						<div class="blog-right-block">
							<div class="blog-title">Síguenos</div>
							<div class="blog-right-block-cont" id="blog-follow">
								<div class="blog-follow">
									<div class="blog-follow-icon"><a href="https://www.facebook.com/pages/Color-Case/829425320435625" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/images/_fb_icon.jpg" alt=""/></a></div>
									<!--<div class="blog-follow-icon"><img src="<?php echo get_template_directory_uri(); ?>/images/_tt_icon.jpg" alt=""/></div>-->
									<div class="blog-follow-icon"><img src="<?php echo get_template_directory_uri(); ?>/images/_pt_icon.jpg" alt=""/></div>
								</div>
							</div>
						</div>
					
					</div>
					
					
					
				</div>
			</div>
		</section>	
		
		<!--- HAZ TU CITA MoViL -->
		
		<section id="haz">
			<div class="container" id="cita-web">
				<a class="fancybox" href="#inline1"><img src="<?php echo get_template_directory_uri(); ?>/images/_btn_appointment.jpg" alt=""/></a>
			</div>
			<div class="container" id="cita-mob">
				<a class="fancybox" href="#inline1"><img src="<?php echo get_template_directory_uri(); ?>/images/_btn_appointment_mob.jpg" alt=""/></a>
			</div>
		</section>
		

		<!-- FOOTER -->
		<section id="copyright">
			<div class="container">
				<div class="copyright_container">
					<div class="copyright_left">©2014 color case. derechos reservados  |  <a class="fancybox" href="#tyc">términos y condiciones</a>   |   <a class="fancybox" href="#pdp">política de privacidad</a></div>
					<div class="copyright_right">sitio por  <a href="http://www.lachulada.net">la chulada</a></div>
				</div>
			</div>	
		</section>
			
		
	</main>
	
	<div id="inline1" style="width:100%; display: none; overflow:hidden;">
		<div id="app-title">
			<div id="app-title-left">Haz tu cita</div>
			<div id="app-title-right" class="app-title-right-s1"></div>
		</div>
		<div id="app-services">
			<div class="app-services-title">1. Selecciona los servicios que te interesan</div>
			<div class="app-services-container">
			<?
				$s_query = new WP_Query('post_type=birs_service&orderby=ID&order=ASC&posts_per_page=-1');
				while ($s_query->have_posts()) : $s_query->the_post(); ?>
				<?
					$time = get_post_meta($post->ID, '_birs_service_length', true );
					$price = get_post_meta($post->ID, '_birs_service_price', true );	
				?>
				
				<div class="app-services-item" data-sid="<?php echo $post->ID; ?>" data-stx="<?php the_title(); ?>" data-spr="<?  echo $price; ?>">
					<div class="app-services-item-sel"><input type="checkbox" name="service" value="<?php the_title(); ?>" id="ckbox"></div>
					<div class="app-services-item-tx"><?php the_title(); ?></div>
					<div class="app-services-item-dr"><?  echo $time; ?>. min</div>
					<div class="app-services-item-pr">$ <?  echo $price; ?></div>
				</div>
				
				<!-- SERVICE ITEM FOR MOBILE-->
				<div class="app-services-item-mob" data-sid="<?php echo $post->ID; ?>" data-stx="<?php the_title(); ?>" data-spr="<?  echo $price; ?>">
					<div class="app-services-item-row">
						<div class="app-services-item-sel"><input type="checkbox" name="service" value="<?php the_title(); ?>" id="ckbox"></div>
						<div class="app-services-item-tx"><?php the_title(); ?></div>
					</div>
					<div class="clear"></div>
					<div class="app-services-item-row">
						<div class="app-services-item-dr"><?  echo $time; ?>. min</div>
						<div class="app-services-item-pr">$ <?  echo $price; ?></div>
					</div>
				</div>
				
				
				<?php endwhile;  wp_reset_query();
			?>
			</div>
			<div class="birs_field_content"><input type="button" value="Siguiente" class="button" id="book_appointment_next"></div>
			<div class="birs_error" id="birs_service_error">Selecciona uno o mas servicios</div>
		</div>
		<div class="clear"></div>
		<div id="app-info">
			<form name="ajax-form" id="ajax-form" action="<?php echo get_template_directory_uri(); ?>/mail-it.php" method="post">
			<input type="hidden" id="birs_appointment_service" name="birs_appointment_service" value=""/>	
			<input type="hidden" id="birs_appointment_price" name="birs_appointment_price" value=""/>
			
				
			<!--<div class="app-services-select"></div>-->
			<div class="app-services-title">2. Ingresa tus datos</div>
			<div class="app-client-field">
				<label>Nombre</label>
				<div class="birs_field_content">
					<input id="birs_client_name_first" name="birs_client_name_first" type="text">
				</div>
				<div class="birs_error" id="birs_client_name_first_error">Ingresa tu nombre</div>
			</div>
			<div class="app-client-field">
				<label>Apellido</label>
				<div class="birs_field_content">
					<input id="birs_client_name_last" name="birs_client_name_last" type="text">
				</div>
				<div class="birs_error" id="birs_client_name_last_error"></div>
			</div>
			<div class="app-client-field">
				<label>Email</label>
				<div class="birs_field_content">
					<input id="birs_client_email" name="birs_client_email" type="text">
				</div>
				<div class="birs_error" id="birs_client_email_error"></div>
			</div>
			<div class="app-client-field">
				<label>Teléfono</label>
				<div class="birs_field_content">
					<input id="birs_client_phone" name="birs_client_phone" type="text">
				</div>
				<div class="birs_error" id="birs_client_phone_error">Ingresa tu teléfono</div>
			</div>
			<div class="app-client-field">
				<div class="birs_error" id="birs_booking_error">Ingresa tus datos correctamente</div>
				<div style="display:none;" id="birs_please_wait">Espera...</div>
				<div class="birs_field_content"><input type="button" value="Reservar" class="button" id="book_appointment"></div>
			</div>
			<div class="birs_error" id="err-timedout">The connection to the server timed out!</div>
			<div class="birs_error" id="err-state"></div>
			
			</form>
		</div>
		
		<div id="app-success">
			<div class="app-success-tx1">Gracias por requerir nuestros servicios</div>
			<div class="paquetes_div"><img src="<?php echo get_template_directory_uri(); ?>/images/_paquetes_div.png" alt=""/></div>
			<div class="app-success-txs">Servicios:</div>
			<div class="app-success-tx"></div>
			<div class="paquetes_div"><img src="<?php echo get_template_directory_uri(); ?>/images/_paquetes_div.png" alt=""/></div>
			<div class="app-success-txm">En breve nos comunicaremos contigo para afinar detalles</div>
			<div class="paquetes_div"><img src="<?php echo get_template_directory_uri(); ?>/images/_paquetes_div.png" alt=""/></div>
			<div class="birs_field_content"><input type="button" value="Finalizar" class="button" id="finish_appointment"></div>
		</div>
		
		
		<? 
			/*$page = get_page_by_title( 'Purifying' );
			echo do_shortcode($page->post_content);*/
			
			
		?>
	</div>
	<!-- POLITICA PRIVACIDAD -->
	<div id="pdp" style="width:100%; display: none; overflow:hidden;">
		<? 
			$page = get_page_by_title( 'POLITICA' );
			
			echo apply_filters('the_content', $page -> post_content);
			
			//echo do_shortcode($page->post_content); 
		?>

		 
	</div>
	<!-- Terminos y condiciones-->
	<div id="tyc" style="width:100%; display: none; overflow:hidden;">
		<? 
			$page = get_page_by_title( 'TERMINOS' );
			
			echo apply_filters('the_content', $page -> post_content);
			
			//echo do_shortcode($page->post_content); 
		?>

		
	</div>
<?php get_footer(); ?>
