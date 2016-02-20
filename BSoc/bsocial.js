var w = $(window).width();
var h = $(window).height();

var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");

var slidenum = 0;
var sectionnum = 1;



//HIDE IMAGES SECTIONS



function mobilecheck() {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

var eventtype = mobilecheck();

$("#status").delay(3000).fadeOut();
$("#preloader").delay(3000).fadeOut("slow");

$(window).load(function() {
	$("#status").delay(3000).fadeOut();
	$("#preloader").delay(3000).fadeOut("slow");
});
			
$(function(){"use strict";

	//alert($(window).height())

	$('.section').css({'height':($(window).height())+'px'});
	$('.bs-menu-item').css({'height':($(window).height()/6)+'px'});
	$('.bs-menu-item-fl').css({'height':($(window).height()/4)+'px'});
	
	$(window).resize(function(){
		$('.section').css({'height':($(window).height())+'px'});
		$('.bs-menu-item').css({'height':($(window).height()/6)+'px'});
		$('.bs-menu-item-fl').css({'height':($(window).height()/4)+'px'});
	});
});





// ---------- CORE BSOCIAL ---------- //
$(document).ready(function() {
	
	// ---------- FULLPAGe SECTIONS ---------- //
	$('#fullpage').fullpage({
		anchors: ['home', 'bsocial', 'historias', 'contacto'],
		sectionsColor: ['#C63D0F', '#4a90c2', '#7E8F7C', '#1BBC9B'],
		css3: true,
		afterLoad: function(anchorLink, index){
			if(index > 1){
				$("#header").fadeTo( "fast" , 1, function() {});
				//HISTORIAS
				if(index == 3){
					$("#bs-video-historias").get(0).play();
					$('#bs-historias-title').fadeTo( "slow", 1);
				} else {
					$("#bs-historias-title").fadeTo( "slow" , 0, function() {
					    $(this).css("display", "none");
					});
				}
			}else{
				$("#header").fadeTo( 100 , 0, function() {
				    $(this).css("display", "none");
				});
			}
			
			//ARROW SCROLL DOWN
			if(index > 1 && index < 4){
				$("#arrow-scroll-w").fadeTo( "fast" , 1, function() {});
				$(".fp-controlArrow").fadeTo( "fast" , 1, function() {});
				
			} else {
				$("#arrow-scroll-w").fadeTo( 100 , 0, function() {
					$(this).css("display", "none");
				});
			}
			
			
			
			//------------------ InitializeSectionsBSOCIAL/Historias ------------///	
			if(index != 2){
				$('.bsocial-content').css( "opacity", 0);
				if(isiPad == -1 && isiPhone  == -1){
					$(".bs-video-show").get(0).currentTime = 0;
					$(".bs-video-show").get(0).pause();
				}
				$('#bs-videojpg-'+slidenum).css( "opacity", 0);
				
				$(".fp-controlArrow").fadeTo( 10 , 0, function() {});
				
				
				
			}
			if(index == 2){
				$('#bsocial-content-'+slidenum).css( "opacity", 1);
				if(isiPad == -1 && isiPhone  == -1){
					$('#bs-video-show-'+slidenum).get(0).play();
				}
				$('#bs-videojpg-'+slidenum).css( "opacity", 1);
				
			}
			
			/* HISTORIAS */
			if(index != 3){
				$('.bb-controlArrow').fadeTo( 10, 0);
			}
			
			if(index == 3){
				$('.bb-controlArrow').fadeTo( "fast", 1);
			}
			
			/* CONTACTO */
			if(index == 4){
				$('#bsocial-contacto').css( "opacity", 1);
			}
			
			
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
			
			$('#bsocial-content-'+slideIndex).css( "opacity", 1);
			if(isiPad == -1 && isiPhone  == -1){
				$('#bs-video-show-'+slideIndex).get(0).play();
			}
			$('#bs-videojpg-'+slideIndex).fadeTo( "slow", 1);
			
			
			slidenum = slideIndex;
			
			
		},
		onSlideLeave: function(anchorLink, index, slideIndex, direction){
			
			$('#bsocial-content-'+slideIndex).css( "opacity", 0);
			if(isiPad == -1 && isiPhone  == -1){
				$('#bs-video-show-'+slideIndex).get(0).currentTime = 0;
				$('#bs-video-show-'+slideIndex).get(0).pause();
			}
			$('#bs-videojpg-'+slideIndex).fadeTo( "fast", 0);
			
		},
		onLeave: function(index, nextIndex, direction){
		          
		}
		
		
	});
	
	
	// ---------- GIF HOME ---------- //
	$('.maximage').maximage({
		cycleOptions: {
			fx: 'none',
			speed: 500, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
			timeout: 1000,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 1,
                   
		},
		onFirstImageLoaded: function(){
			jQuery('#cycle-loader').hide();
			jQuery('.maximage').fadeIn('slow');
		}
	});
	
	
	/* VIDEO HISTORIAS */
	jQuery('video, object').maximage('maxcover');
	
	
	
	
	
	
	// -------------------------- //
	// ---------- MENU ---------- //
	
	var bsmenuprincipal = '<li class="bs-menu-item"><a href="#bsocial">Tu negocio 2.0</a></li>'+
						  '<li class="bs-menu-item"><a href="#bsocial/en-el-mapa">En el mapa</a></li>'+
						  '<li class="bs-menu-item"><a href="#bsocial/en-tus-zapatos">En tus zapatos</a></li>'+
						  '<li class="bs-menu-item"><a href="#historias">Nuestras Historias</a></li>'+
						  '<li class="bs-menu-item"><a href="#contacto">Contacto</a></li>'+
						  '<li class="bs-menu-item">'+
						  	'<div id="bs-menu-sub-container">'+
						 	   '<div class=bs-menu-sub>términos y condiciones</div>'+
								'<div class=bs-menu-sub>política de privacidad</div>'+
								'<div class=bs-menu-sub>©2015 BSocial. derechos reservados</div>'+
								'<div class=bs-menu-sub>sitio por LA CHULADA</div>'+
							  '</div>'+
						  '</li>';
						  
	var bsmenufollow = 	  '<li class="bs-menu-item-fl"><a href="http://www.facebook.com/agencia.bsocial" target="_blank" id="fl-1"><span class="bs-menu-small-tx">Búscanos</span></a></li>'+
						  '<li class="bs-menu-item-fl"><a href="http://www.twitter.com/agencia.bsocial" target="_blank" id="fl-2"><span class="bs-menu-small-tx">Síguenos</span></a></li>'+
						  '<li class="bs-menu-item-fl"><a href="https://www.linkedin.com/company/b-social-s-a-p-i-de-c-v?trk=biz-companies-cym" target="_blank" id="fl-4"><span class="bs-menu-small-tx">Contáctanos</span></a></li>'+
						  '<li class="bs-menu-item-fl"><a href="http://b-social.com.mx/blog" target="_blank" id="fl-3"><span class="bs-menu-small-tx">Léenos</span></a></li>';
						 
	
	/* MENU PRINCIPAL */
	$("#bs-menu-menu" ).click(function() {
		//ADD LIST MENU ITEMS
		$('#bs-menu-list').html(bsmenuprincipal);
		$('.bs-menu-item').css({'height':($(window).height()/6)+'px'});
		$('.bs-menu-item-fl').css({'height':($(window).height()/4)+'px'});
		
		
		if(!$("#bs-container").hasClass("bs-menu-open")){
			
			$("#bs-container").addClass("bs-effect").delay(25).queue(function(next){
			    $(this).addClass("bs-menu-open");
				
				if (eventtype){
					$('.bs-pusher').click(function() {
						$("#bs-container").removeClass('bs-menu-open');
					});
				}else{
					$(window).click(function() {
						$("#bs-container").removeClass('bs-menu-open');;
					});
				}
				
				
			    next();
			});
		} else {
			//$("#bs-container").removeClass('bs-effect');
			//$("#bs-container").removeClass('bs-menu-open');
		}
	});
	
	/* MENU FOLLOW */
	
	$("#bs-follow" ).click(function() {
		//ADD LIST MENU ITEMS
		$('#bs-menu-list').html(bsmenufollow);
		$('.bs-menu-item').css({'height':($(window).height()/6)+'px'});
		$('.bs-menu-item-fl').css({'height':($(window).height()/4)+'px'});
		
		
		if(!$("#bs-container").hasClass("bs-menu-open")){
			
			$("#bs-container").addClass("bs-effect").delay(25).queue(function(next){
			    $(this).addClass("bs-menu-open");
				if (eventtype){
					$('.bs-pusher').click(function() {
						$("#bs-container").removeClass('bs-menu-open');
					});
				}else{
					$(window).click(function() {
						$("#bs-container").removeClass('bs-menu-open');;
					});
				}
			    next();
			});
		} else {
			//$("#bs-container").removeClass('bs-effect');
			//$("#bs-container").removeClass('bs-menu-open');
		}
	});
	
	/* MENU CONTACTO */
	
	$("#bs-item-contacto" ).click(function() {
		$.fn.fullpage.moveTo(4);
	});	
	
	$("#logo" ).click(function() {
		$.fn.fullpage.moveTo(1);
	});
	
	$("#arrow-scroll-b" ).click(function() {
		$.fn.fullpage.moveSectionDown();
	});
	
	$("#arrow-scroll-w" ).click(function() {
		$.fn.fullpage.moveSectionDown();
	});
	
	$(".bsocial-content-btn-l").click(function() {
		$.fn.fullpage.moveTo(4);
	});	
	$(".bsocial-content-btn").click(function() {
		$.fn.fullpage.moveTo(4);
	});	
	
	
	/*  DIRECCIÓN */	
	
	/*$(".bsocial-contacto-loc").click(function() {
		location.href="https://www.google.com.mx/maps/place/19%C2%B023'38.0%22N+99%C2%B010'19.5%22W/@19.3938886,-99.1720833,17z/data=!4m2!3m1!1s0x0:0x0";
	});	*/	
	
});

// ---------- BOOKBLOCK BS-HISTORIAS---------- //

var Page = (function() {
	
	var config = {
			$bookBlock : $( '#bb-bookblock' ),
			$navNext : $( '#bb-nav-next' ),
			$navPrev : $( '#bb-nav-prev' ),
			$navFirst : $( '#bb-nav-first' ),
			$navLast : $( '#bb-nav-last' )
		},
		init = function() {
			config.$bookBlock.bookblock( {
				speed : 1000,
				shadowSides : 0.8,
				shadowFlip : 0.4
			} );
			initEvents();

		},
		initEvents = function() {
			
			var $slides = config.$bookBlock.children();
			
			// add navigation events
			config.$navNext.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'next' );
				return false;
			} );

			config.$navPrev.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'prev' );
				return false;
			} );

			config.$navFirst.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'first' );
				return false;
			} );

			config.$navLast.on( 'click touchstart', function() {
				config.$bookBlock.bookblock( 'last' );
				return false;
			} );
			
			// add swipe events
			$slides.on( {
				'swipeleft' : function( event ) {
					config.$bookBlock.bookblock( 'next' );
					return false;
				},
				'swiperight' : function( event ) {
					config.$bookBlock.bookblock( 'prev' );
					return false;
				}
			} );
			
			

			// add keyboard events
			$( document ).keydown( function(e) {
				var keyCode = e.keyCode || e.which,
					arrow = {
						left : 37,
						up : 38,
						right : 39,
						down : 40
					};

				switch (keyCode) {
					case arrow.left:
						config.$bookBlock.bookblock( 'prev' );
						break;
					case arrow.right:
						config.$bookBlock.bookblock( 'next' );
						break;
				}
			} );
		};

		return { init : init };

})();
Page.init();



