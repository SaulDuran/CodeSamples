$(document).ready(function() {
	/* INIT VARS */
	var showHome = true;
		
	var $window = $(window);
	var h = $window.height() - 160;
	var w = $window.width();
	 
	var originalTitle = $.address.title();
	var path_length = 0;
	var section = '';
	var subsection = '';
	var sectionActive = false;
	var $content;
	var idPost = 0;
	var postContent = "";
	var postSlug = "";
	var postType = "";
	//
	var p_w = 0;
	var p_h = 0;
	var p_h_s = h-10;
	var cont_w = '';
	var $container = '';
	//BLOG
	var idPostBlog = 0;
	var titlePostBlog = '';
	
	var page = '';
	
	var titulo = "";
	//GENERAL
	var edicionTitle = "";
	var backHome = "";
	var backBlog = "";
	var backBackstage = "";
	
	//GET BACK HOME 
	function getGeneral(){
		$.ajax({
			url: '_includes/_get_general.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postId=0",
			success: function(datos){
					edicionTitle = datos.edicion;
					backHome = datos.backHome;
					backBlog = datos.backBlog;
					backBackstage = datos.backBackstage;
					
					$('#edicionT').html(edicionTitle);
					
					initHome();
					
					
				}
		});
	}
	getGeneral();
	
	/* ----- HOME ----- */
	function initHome(){
		
		
		var bckHome = backHome.split('.');
		alert(bckHome[0])
		//BACKGROUND
		if(bckHome[1] == 'jpg'){
			jQuery(function($){
				$.supersized({
					slides  :  	[ {image : backHome, title : '192'} ]
				});
			 });
		} else if(bckHome[1] == 'mp4'){
			var randomNum = Math.ceil(Math.random()*2);
			/*VIDEO BACKGROUND*/
			$('body').prepend('<div class="video-background"></div>');
			$('.video-background').videobackground({
				videoSource: [bckHome[0]+'.mp4', bckHome[0]+'.webm'], 
				controlPosition: '#vidc',
				loop: 'true',
				preload:'true',
				poster: bckHome[0]+'.jpg'
			});
		}
		
		
		//MENU
		var top_menu=($window.height() / 2) - 30;
		$('#menu').animate({top:top_menu, width:'95%'}, "slow");
		/*NAVIGATION*/
		jQuery(function(){
			jQuery('ul.sf-menu').superfish({
				autoArrows:false,
				animation:   {opacity:'show'}
			});
		});
		
		$('.submenuItem').click(function(){
			idPost = $(this).data('id');
			$.address.title(originalTitle + ' | ' + $(this).text());
			return false;
		 });
		
	}
	
	/* ----- MENU ------ */
	function animateMenu(mov){
		switch (mov) {
			case 'fromhome':
				$('#menu').animate({top:0, width:'100%'}, "slow");
			break;
			case 'tohome':
				$('#menu').animate({top:top_menu, width:'95%'}, "slow");
			break;
		}	
	}
	
	/* ----- ADDRESS ------ */
	function initAddressHandler(){
		$.address.crawlable(true).init(function(event) {
			$('#menu_container a:not([href^=http])').address();
			
		}).internalChange(function(event) {
			path_length = event.pathNames.length;
			section = event.pathNames[0];
			subsection = event.pathNames[1];
			
			if(event.path != "/"){
				if(sectionActive){
					showContainer();
				} else {
					animateMenu('fromhome');
					$('#supersized').fadeTo('slow', 0, function() {
						$('#supersized').addClass("hide");
						//LOGO
						$('#logo').animate({top:50}, "slow");
						//CHANGE SECTION
						showContainer();
					});
				}
			} else {
				//DEACT SECTIOM
				sectionActive = false;
				animateMenu('tohome');
			}
		
		}).externalChange(function(event) {
			path_length = event.pathNames.length;
			section = event.pathNames[0];
			subsection = event.pathNames[1];
			if(event.path != "/"){
				if(sectionActive){
					showContainer();
				} else {
					animateMenu('fromhome');
					$('#supersized').fadeTo('slow', 0, function() {
						$('#supersized').addClass("hide");
						//LOGO
						$('#logo').animate({top:50}, "slow");
						//SECTION
						$('#wrapper').append('<div id="content"></div>');
						sectionActive = true;
						if(path_length>1){
							postSlug = subsection;
							getContenExternal();
						} else {
							showContainer();
						}
						
					});
				}
			} else {
				//DEACT SECTIOM
				sectionActive = false;
				animateMenu('tohome');
			}
			
			
		})		
	}
	
	/* ----- SHOW SECTION ------ */
	function showContainer(){
		postContent = '';
		if(sectionActive){
			
			$('#content').fadeTo('slow', 0, function() {
				$('#wrapper').remove('#content');
				$('#wrapper').append('<div id="content"></div>');
				$content = $('#content');
				$content.css({
					height: h,
					top: 160	
				});
				
				$('.video-background').fadeTo(300, 0, function() {
					$('.video-background').addClass("hide");
				})
				
				$('#supersized').fadeTo(300, 0, function() {
					$('#supersized').addClass("hide");
				});
				
				
				switch (section) {
					
					case 'nosotros':
						$.address.title(originalTitle + ' | Nosotros');
						page = 'Nosotros'
						showUs();
					break;
					case 'suscripciones':
						$.address.title(originalTitle + ' | Suscríbete');
						page = 'Suscríbete'
						showUs();
					break;
					case 'backstage':
						//BACKGROUND BACKSTAGE
						$('#supersized').remove();
						$('#supersized-loader').remove();
						$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
						$('#supersized').css({
							display: 'none'
						})
						showContent();
					break;
					case 'edicion':
						showContent();
					break;
					case 'blog':
						//BACKGROUND BLOG
						$('#supersized').remove();
						$('#supersized-loader').remove();
						$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
						$('#supersized').css({
							display: 'none'
						})
						if(path_length>1){
							showContentBlog();
						}else{
							showContentBlog();
						}
					break;
				}
			});
		} else {
			$('.video-background').fadeTo(300, 0, function() {
					$('.video-background').addClass("hide");
			})
			
			sectionActive = true;
			$('#wrapper').append('<div id="content"></div>');
			$content = $('#content');
			$content.css({
				height: h,
				top: 160,
				display: 'none'	
			});
			switch (section) {
				case 'nosotros':
						page = 'Nosotros'
						showUs();
				break;
				case 'suscripciones':
						page = 'Suscríbete'
						showUs();
				break;
				case 'backstage':
					//BACKGROUND BACKSTAGE
					$('#supersized').remove();
					$('#supersized-loader').remove();
					$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
					$('#supersized').css({
						display: 'none'
					})
					showContent();
				break;
				case 'edicion':
					showContent();
				break;
				case 'blog':
					//BACKGROUND BLOG
					$('#supersized').remove();
					$('#supersized-loader').remove();
					$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
					$('#supersized').css({
						display: 'none'
					})
					$.address.title(originalTitle + ' | ' + 'Blog');
					showContentBlog();
				break;
			}
		}
		
	}
	function showContent(){
		$("body").css({
			'overflow': 'hidden'
		});
		
		$.ajax({
			url: '_includes/_get_content.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postId="+idPost,
			success: function(datos){
				$('#wrapper').append('<div id="img_preload"></div>');
				var imgs = '';
				//SECTION
				switch (section) {
					
					case 'backstage':
					  postContent = '<div id="content_center"></div>';
					  $('#content').html(postContent);
					  //RESIZE
					  var thw = 170;
					  var thh = 120;
					  
					  var numCols = Math.floor(w / thw);
					  
					  var thumbContainerWidth = Math.floor( w / numCols );
					  thumbContainerWidth = w / numCols;
					  
					  $.each(datos.scr, function(key, val) {
						  if(key == 0){
						  	  itemBS = '<div class="p_backstage_container" id="container_'+key+'">';
							  itemBS = itemBS + '<div class="p_backstage_item">';
							  itemBS = itemBS + '<a class="fancybox" rel="gallery1" href="'+val+'" id="thBckStg"><img src="'+val+'" alt="" id="backstage_img_init"/>';
							  itemBS = itemBS + '<div id="th_backstage">'+datos.title+'</div>';
							  itemBS = itemBS + '</a>';
							  itemBS = itemBS + '</div>';
							  itemBS = itemBS + '</div>';	
						  } else {
							  itemBS = '<div class="p_backstage_container" id="container_'+key+'">';
							  itemBS = itemBS + '<div class="p_backstage_item">';
							  itemBS = itemBS + '<a class="fancybox" rel="gallery1" href="'+val+'"><img src="'+val+'" alt="" id="backstage_img_'+key+'"/></a>';
							  itemBS = itemBS + '</div>';
							  itemBS = itemBS + '</div>';
						  }
						  
						  $('#content_center').append(itemBS);
						  
						  $('.p_backstage_container').css({
							  width: thumbContainerWidth
						  });
					  });
					  //PRECENT
					  var perBStg = (1260 * 100) / w;  
					  $('#content_center').css({
					  		width: 100+'%'
					  });
					  
					  
					  $(".fancybox").fancybox({
						  openEffect	: 'fade',
						  closeEffect	: 'fade'
					  });
					  // OVER TH
					  $("#thBckStg").hover(
						function () {
							$('#th_backstage').show();
							$('#backstage_img_init').hide();
						}, 
						function () {
							$('#th_backstage').hide();
							$('#backstage_img_init').show();
						}
					  );
					  //PRELOad
					  preloadBackstage();
					  
					  $('#menu').css({
						position: 'fixed'
					  });
					  $('#logo').css({
						position: 'fixed'
					  });
					   $("body").css({
						'overflow-y': 'auto'
					  });
		
					 
					break;
					case 'edicion':
						postContent = '<div id="content_lc">&nbsp;</div>';
						postContent += '<div id="content_mc"><div id="p_images"></div></div>';
						postContent += '<div id="content_rc">';
						postContent += '<div id="content_title" class="p_title">'+datos.title+'</div>';
						postContent += '<div id="content_tx">';
						//SCROLL
						postContent += '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>';
						postContent += '<div class="viewport">';
						postContent += '<div class="overview">';
						postContent += datos.content;
						postContent += '</div>';
						postContent += '</div>';
						postContent += '</div>';
						//
						postContent += '</div>';
				
						$('#content').html(postContent);
						cont_w = $("#content_mc").width();
							
						showImages(datos.scr, datos.imgw, datos.imgh);
						imgs = $('#p_images img').length;
						//PRELOAD
						preload(imgs)
						
						//SHARE
						titulo = datos.title;
						$('.p_subtitle').appendTo("#content_title");
						
						$.address.title(originalTitle + ' | ' + datos.title);
						
						$('#content_rc .p_subtitle').after('<div id="content_share"><div id="btnFB" class="btnShare"><img src="_images/_icon_fb.jpg"/></div><div id="btnTT" class="btnShare"><img src="_images/_icon_tt.jpg"/></div></div>')
						$('#btnFB').click(function(){
							postType = 'edicion';
							postToFeed();
							return false;
						  });
						$('#btnTT').click(function(){
							postType = 'edicion';
							postToTT();
							return false;
						  });  

						//RESIZE
						var per = 100 - ((145 * 100) / w);
						var perRC = parseInt((100 - ((145 * 100) / w)) - 60);
						$("#content_lc").css({
							width: 145
						});
						$("#content_mc").css({
							width: '60%'
						});
						
						var sTx = ((perRC * w) / 100) - 30;
						$("#content_rc").css({
							width: sTx,
							height: p_h_s
						});
						//TX
						
						$("#content_title").css({
							width: sTx - 10
						});
						$("#content_tx").css({
							width: sTx - 10,
							height: p_h_s - $("#content_title").height()
							
						});
						$(".viewport").css({
							width: sTx - 30,
							height: p_h_s - $("#content_title").height()
						});
						
						$('#content_tx').tinyscrollbar();
						
					
							
					break;
				}
				
			}
		});
	}
	//BACKSECTIONS
	function showBackSuper(bck){
		jQuery(function($){
			$.supersized({
				slides  	:  	[ {image : bck, title : '192'} ]
			});
		 });
		$('#supersized').fadeTo(600, 1)
	}

	function showContentBlog(){
		var postDiv = '';
		postContent = '';
		$.ajax({
			url: '_includes/_get_blog.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postPerPage=36",
			success: function(datos){
				$('#wrapper').append('<div id="img_preload"></div>');
				postContent += '<div id="content_blog_l"></div>';
				postContent += '<div id="content_blog_r"></div>';
				
				$('#content').html(postContent);
				
				//RESIZE
				var rcSize = w - 220;
				$("#content_blog_l").css({
					width: rcSize
				});
				$("#content_blog_r").css({
					height: h - 20
				});
				
				var post_thw = 180;
				var post_thh = 140;
				var num_post_cols = Math.floor(rcSize / post_thw);
				var postContainerWidth = Math.floor( rcSize / num_post_cols );
				postContainerWidth = rcSize / num_post_cols;
				
				$.each(datos.imagePost, function(key, val) {
					if(val == ''){
						val = '<img width="240" height="240" src="http://revista192.com/_cms/wp-content/uploads/2012/07/noth.jpg" class="attachment-post-thumbnail wp-post-image" alt="" title="" />'
					}
					postDiv = '<div class="post_container" id="post_'+datos.ids[key]+'">';
					postDiv = postDiv + '<div class="post_item">';
					postDiv = postDiv + val;
					postDiv = postDiv + '<div class="th_post_over" id="th_post_over'+datos.ids[key]+'">'+datos.titlePost[key]+'</div>';
					postDiv = postDiv + '</div>';
				  	postDiv = postDiv + '</div>';

					$('#content_blog_l').append(postDiv);
					
					var itemPost = $('#post_'+datos.ids[key]+'');
					itemPost.data('id_post', datos.ids[key]);
					itemPost.click(function(){
						idPostBlog = $(this).data('id_post');
						titlePostBlog = datos.titlePost[key];
						showContentBlogPost()
						return false;
					});
					// OVER TH
					itemPost.hover(
						function () {
							$('#th_post_over'+datos.ids[key]+'').show();
							itemPost.find('img').hide();
							
						}, 
						function () {
							$('#th_post_over'+datos.ids[key]+'').hide();
							itemPost.find('img').show();
						}
					  );
					
						
					$('.post_container').css({
						  width: postContainerWidth
					});
				});
				preloadBlog();
				//GET BANNERS
				getBanners();
				
				if(path_length>1){
					showContentBlogPost();
				}
			}
		});
	}
	function getBanners(){
		$.ajax({
			url: '_includes/_get_banners.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postId=1",
			success: function(datos){
				$.each(datos.adBanners, function(key, val) {
					var bannAd = '';
					bannAd = '<div class="bannerBlog">'+val+'</div>';
					$('#content_blog_r').append(bannAd);
				});
			}
		})	
	}
	function showContentBlogPost(){
		$.ajax({
			url: '_includes/_get_blog_post.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postId="+idPostBlog,
			success: function(datos){
				postContent = '';
				postContent += '<div id="contentPostContent">'
				postContent += '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>'
				postContent += '<div class="viewport">'
				postContent += '<div class="overview">'
				
				postContent += '<div id="content_title_blog" class="p_title">'+datos.title+'</div>';
				postContent += '<div id="content_meta_blog_date" class="p_meta">'+datos.date+'</div>';
				
				postContent += '<div id="post_content_images"></div>';
				postContent += '<div id="post_content_tx">';
				
				postContent += '<div id="content_tx_blog">';
				postContent += datos.content;
				postContent += '</div>';
				postContent += '</div>';
				
				postContent += '</div>';
				postContent += '</div>';
				postContent += '</div>';
				
				
				$('#contentBlogItem').html(postContent);	
				
				$.fancybox({
					'href'			: '#contentBlogItem',
					'transitionIn'	: 'elastic',
					'transitionOut'	: 'elastic'
				});
				//SCROLL
				$("#post_content_tx").css({
					height: $('#content_tx_blog').height() + 250
				});

				//SHARE
				titulo = datos.title;
						
				$('#content_meta_blog_date').after('<div id="content_share_p"><div id="btnFB" class="btnShare"><img src="_images/_icon_fb.jpg"/></div><div id="btnTT" class="btnShare"><img src="_images/_icon_tt.jpg"/></div></div>')
						
				$('#btnFB').click(function(){
					subsection = datos.postname;
					postType = 'blog';
					postToFeed();
					return false;
				  });
						  
				$('#btnTT').click(function(){
					subsection = datos.postname;
					postType = 'blog';
					postToTT();
					return false;
				  });  			
				
				//PRELOAD
				showImagesPost(datos.scr, datos.imgw, datos.imgh);
				imgs = $('#p_images img').length;
				preload(imgs)
				
				$('#contentPostContent').tinyscrollbar();
			}
		})
	}
	//GET CONTENT EXTERNAL
	function getContenExternal(){
		$.ajax({
			url: '_includes/_get_post_by_name.php',
			type: "POST",
			dataType: "json",
			data: "submit=&postSlug="+postSlug,
			success: function(datos){
				if(section == 'edicion'){
					idPost= datos.idp;
				}
				if(section == 'blog'){ 
					idPostBlog = datos.idp;
				}
				showContainer();
			}
		})
	}
	
	
	/* ----- GET IMAGES POST----- */
	function showImagesPost(img, wimg, himg){
		var w_p_images = 0;
		$.each(img, function(key, val) {
			$('#post_content_images').append('<img src="'+val+'" alt="" id="img_'+key+'" class="post_images_img"/>');
			var p_h_i = Math.ceil(himg[key] / wimg[key] * 450);
			
			$('#img_'+key).width(450);
			$('#img_'+key).height(p_h_i);
			w_p_images += p_h_i + 10;
		});
		$("#post_content_images").css({
			height: w_p_images
		});
	}
	/* ----- GET IMAGES ----- */
	function showImages(img, wimg, himg){
		var w_p_images = 0;
		$.each(img, function(key, val) {
			//$('#p_images').append('<div id="p_images_li_'+key+'" class="p_images_img"><img src="'+val+'" alt="" id="img_'+key+'"/></div>');
			$('#p_images').append('<img src="'+val+'" alt="" id="img_'+key+'" class="p_images_img"/>');
			var p_w_s = Math.ceil(wimg[key] / himg[key] * p_h_s);
			
			$('#img_'+key).width(p_w_s);
			$('#img_'+key).height(p_h_s);
			
			w_p_images += p_w_s + 6;
			
			//$('#p_images_li_'+key).width($('#img_'+key).width());
		});
		
		$("#p_images").css({
			width: w_p_images,
			height: p_h_s
		});

	}
	
	/* ----- GET IMAGES BACKSTAGE ----- */
	function showImagesBackstage(img){
		$.each(img, function(key, val) {
			$('#content_center').append('<div class="p_backstage_item"><a class="fancybox" rel="gallery1" href="'+val+'"><img src="'+val+'" alt="" id="backstage_img_'+key+'"/></a></div>');
			//SIZE
			$('#backstage_img_'+key).height(p_h_s)
		});
		$(".fancybox").fancybox({
			openEffect	: 'fade',
			closeEffect	: 'fade'
		});
	}
	
	/* ----- PRELOAD ----- */
	function preload(im){
		var i = 1;
		var int = setInterval(function() {
			if(i >= im){
				$('#img_preload').remove();
				$('#content').fadeTo('slow', 1, function() {});
				clearInterval(int);
			}
		i++;
		}, 500);
	}
	/* ----- PRELOAD ----- */
	function preloadBackstage(){
		var ims = 30;
		var i = 1;
		var int = setInterval(function() {
			if(i >= ims){
				//SHOW CONTENT
				$('#img_preload').remove();
				$('#content').delay(600).fadeTo(600, 1);
				showBackSuper(backBackstage);
				clearInterval(int);
			}
			i++;
		}, 500);
	}
	/* ----- PRELOAD BLOG ----- */
	function preloadBlog(){
		var ims = $('#p_images_container img').length;
		var i = 1;
		var int = setInterval(function() {
			if(i >= ims){
				//SHOW CONTENT
				$('#img_preload').remove();
				$('#content').fadeTo('slow', 1, function() {});
				showBackSuper(backBlog);
				clearInterval(int);
			}
			i++;
		}, 500);
	}
	/* ----- PRELOAD BLOG DET----- */
	function preloadBlogDetail(){
		var ims = $('#content_mc_blog_det img').length;
		var i = 1;
		var int = setInterval(function() {
			if(i >= ims){
				//SHOW CONTENT
				$('#img_preload').remove();
				$('#content').fadeTo('slow', 1, function() {});
				clearInterval(int);
			}
			i++;
		}, 500);
	}
	
	/* ----- SHOW US ------ */
	function showUs(){
		$.ajax({
			url: '_includes/_get_page.php',
			type: "POST",
			dataType: "json",
			data: "submit=&page="+page,
			success: function(datos){
				$('#wrapper').append('<div id="img_preload"></div>');
				postContent = '';
				switch (page) {
					case 'Nosotros':
						postContent = '<div id="content_lc_page">&nbsp;</div>';
						postContent += '<div id="content_mc_page"><img src="'+datos.th+'" alt="" id="us_img"/></div>';
						postContent += '<div id="content_rc_page">';
						postContent += '<div id="content_header_page"><div id="content_title_page" class="p_title">'+datos.title+'</div>';
						postContent += '<div id="btnLang"><div id="btnEn"><img src="_images/_btn_english.jpg" id="en"/><img src="_images/_btn_spanish.jpg" id="sp"/>';
						postContent += '</div></div></div>';
						postContent += '<div id="content_tx_page">'+datos.content+'</div>';
						postContent += '</div>';
						
						$('#content').html(postContent);
						
						//LANG
						$('#en').click(function(){

							$('#spTx').fadeTo('slow', 0, function() {
								$('#enTx').fadeTo("slow", 1);
								$('#en').hide();
								$('#sp').show();

								$('#enTx').css({
									top: 0
								});
							})

							return false;
						 });
						 $('#sp').click(function(){

							$('#enTx').fadeTo('slow', 0, function() {
								$('#spTx').fadeTo("slow", 1);
								$('#sp').hide();
								$('#en').show();

								$('#spTx').css({
									top: 0
								});

							})

							return false;
						 });
					break;
					case 'Suscríbete':
						postContent = '<div id="content_lc_page">&nbsp;</div>';
						postContent += '<div id="content_mc_page"><img src="'+datos.th+'" alt="" id="us_img"/></div>';
						postContent += '<div id="content_rc_page">';
						postContent += '<div id="content_header_page"><div id="content_title_page" class="p_title">'+datos.title+'</div></div>';
						postContent += '<div class="suscribeteTitle">6 ediciones por 625 pesos (DF)</div>';
						postContent += '<div style="position:relative; height:40px;"><form class="formBuy" action="https://mexico.dineromail.com/Shop/Shop_Ingreso.asp" method="post" target="_blank">';
						postContent += '<input type="hidden" name="NombreItem" value="1 año (DF y Estado de México)" />';
						postContent += '<input type="hidden" name="TipoMoneda" value="1" />';
						postContent += '<input type="hidden" name="PrecioItem" value="625.00" />';
						postContent += '<input type="hidden" name="E_Comercio" value="286296" />';
						postContent += '<input type="hidden" name="NroItem" value="DF" />';
						postContent += '<input type="hidden" name="image_url" value="https://mexico.dineromail.com/imagenes/LogosVendedores/286296.jpg" />';
						postContent += '<input type="hidden" name="DireccionExito" value="http://www.revista192.com/intentalo.html" />';
						postContent += '<input type="hidden" name="DireccionFracaso" value="http://www.revista192.com/problema.html" />';
						postContent += '<input type="hidden" name="DireccionEnvio" value="1" /> <input type="hidden" name="Mensaje" value="1" />';
						postContent += '<input type="image" name="submit" src="http://www.revista192.com/_test/_images/_btnshop.jpg" alt="Pagar con DineroMail" align="middle" />';
						postContent += '</form></div>';
						
						postContent += '<div class="suscribeteTitle">6 ediciones por 1,110 pesos (Interior de la república)</div>';
						postContent += '<div style="position:relative; height:40px;"><form class="formBuy" action="https://mexico.dineromail.com/Shop/Shop_Ingreso.asp" method="post" target="_blank">';
						postContent += '<input type="hidden" name="NombreItem" value="1 año (Interior de la República)" />';
						postContent += '<input type="hidden" name="TipoMoneda" value="1" />';
						postContent += '<input type="hidden" name="PrecioItem" value="1110.00" />';
						postContent += '<input type="hidden" name="E_Comercio" value="286296" />';
						postContent += '<input type="hidden" name="NroItem" value="REP" />';
						postContent += '<input type="hidden" name="image_url" value="https://mexico.dineromail.com/imagenes/LogosVendedores/286296.jpg" />';
						postContent += '<input type="hidden" name="DireccionExito" value="http://www.revista192.com/intentalo.html" />';
						postContent += '<input type="hidden" name="DireccionFracaso" value="http://www.revista192.com/problema.html" />';
						postContent += '<input type="hidden" name="DireccionEnvio" value="1" />';
						postContent += '<input type="hidden" name="Mensaje" value="1" />';
						postContent += '<input type="image" name="submit" src="http://www.revista192.com/_test/_images/_btnshop.jpg" alt="Pagar con DineroMail" align="middle" />';
						postContent += '</form></div>';
						postContent += '<div class="suscribeteTitle">Se aceptan todas las tarjetas de crédito o débito, puedes diferir tu cargo en mensualidades sin intereses.</div>';
						postContent += '</div>';
						
						$('#content').html(postContent);
						
					break;
				}
				//IMAGE
				var i_w_s = Math.ceil(datos.wimg / datos.himg * p_h_s);
				$('#us_img').width(i_w_s);
				$('#us_img').height(p_h_s);
	
				//RESIZE
				var per = 100 - ((145 * 100) / w);
				var perRC = parseInt((100 - ((145 * 100) / w)) - 40);
				$("#content_lc_page").css({
					width: 145
				});
				$("#content_mc_page").css({
					width: '40%'
				});
				$("#content_rc_page").css({
					width: perRC+'%'
				});
				preloadBlogDetail();
					
			}
		});
	}
	/* ----  SHARE ----*/
	function postToFeed() {
		//SHORT URL
		var urlTT = 'http://www.revista192.com/#!/'+postType+'/'+subsection;
		var username="o_56v1ptagl5";
		var key="R_b268c66525d1877f6b3db4450d113675";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:urlTT,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v)
			{
				var bit_url=v.data.url;
				FB.init({appId: "482551805088688", status: true, cookie: true});
				 var obj = {
						  method: 'feed',
						  link: bit_url,
						  picture: 'http://www.revista192.com/_images/_logo.png',
						  name: 'Revista 192 / '+titulo,
						  caption: 'Revista 192 / '+titulo,
						  description: '',
						  show_error: true
				  };

				  function callback(response) {

				  }

				  FB.ui(obj, callback);
			}
		});
		 
      }
	  function postToTT() {
		var H =  w/2 - 225;
		var G =  h/2 - 175;
		//SHORT URL
		var urlTT = 'http://www.revista192.com/#!/'+postType+'/'+subsection;
		var username="o_56v1ptagl5";
		var key="R_b268c66525d1877f6b3db4450d113675";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:urlTT,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v)
			{
				var bit_url=v.data.url;
				window.open('http://twitter.com/share?url='+bit_url+'&rel="canonical"&text=Revista 192 / '+titulo+'','','left='+H+',top='+G+',width=550,height=350, personalbar=0,toolbar=0,scrollbars=1,resizable=1');
				
			}
		});
		
		
      }
	
	
	
	//RESIZE
	  
	$(window).resize(function() {
		switch (section) {
			case 'backstage':
				w = $window.width();
				//RESIZE
				var thw = 170;
				var thh = 120;
				var numCols = Math.floor(w / thw);
				var thumbContainerWidth = Math.floor( w / numCols );
				thumbContainerWidth = w / numCols;
				$('.p_backstage_container').css({
					width: thumbContainerWidth
				});
				
			break;
			case 'blog':
				w = $window.width();
				//RESIZE
				var rcSize = w - 220;
				$("#content_blog_l").css({
					width: rcSize
				});
				$("#content_blog_r").css({
					height: h - 20
				});
				
				var post_thw = 180;
				var post_thh = 140;
				var num_post_cols = Math.floor(rcSize / post_thw);
				var postContainerWidth = Math.floor( rcSize / num_post_cols );
				postContainerWidth = rcSize / num_post_cols;
				
				$('.post_container').css({
					  width: postContainerWidth
				});
				
			break;
		}
	});

	/* ----- CALL FUNCTIONS -----*/
	
	initAddressHandler();
});


