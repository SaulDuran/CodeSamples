var topBtnPrecios;
var windowsize = $(window).width();

$(window).on('beforeunload', function(){
	$("#preloader").fadeIn(1);
  	$(window).scrollTop(0);
});
$(document).load().scrollTop(0);

$(window).load(function() {
	$("#status").fadeOut();
	$("#preloader").delay(1050).fadeOut("slow");
	
	if (windowsize > 760) {
		$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	}
	$(this).scrollTop(0);
	$(window).scrollTop(0);
	
}).scrollTop(0);
			
/*global $:false */
$(function(){"use strict";
	
	
	$(this).scrollTop(0);
	$(window).scrollTop(0);

	$('#home').css({'height':($(window).height())+'px'});
	$('#home_0').css({'height':($(window).height())+'px'});
	
	$('#slidesContainer').css({'top':(($(window).height()/2)-($('#slidesContainer').height()/2))+'px'});
	
	if (windowsize > 760 && windowsize <= 1024) {
		
		$('#scrolldown').css({'bottom':(($(window).height()/2)-310)+'px'});
		
		$('#colorcase').css({'height':($(window).height())+'px'});
		$('#servicios').css({'height':($(window).height()-90)+'px'});
		$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
		
		$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	
		$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
		
		
		$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-100)+'px'});
		$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-110)+'px'});
		$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-148)+'px'});
	
		$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
		topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
	
		$('.three').css({'width':(($(window).width()/3)-20)+'px'});
		$('#paquetes').css({'height':($(window).height()-70)+'px'});
	} 
	
	if (windowsize >= 1024 && windowsize <= 1280) {
		
		$('#scrolldown').css({'bottom':(($(window).height()/2)-262)+'px'});
		
		$('#colorcase').css({'height':($(window).height())+'px'});
		$('#servicios').css({'height':($(window).height()-90)+'px'});
		$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
		
		$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	
		$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
		
		
		$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-100)+'px'});
		$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-110)+'px'});
		$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-148)+'px'});
	
		$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
		topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
	
		$('.three').css({'width':(($(window).width()/3))+'px'});
		$('#paquetes').css({'height':($(window).height()-70)+'px'});
		
	} 
	
	if(windowsize > 1280) {
		
		
		$('#scrolldown').css({'bottom':(($(window).height()/2)-315)+'px'});
		
		$('#colorcase').css({'height':($(window).height())+'px'});
		$('#servicios').css({'height':($(window).height()-90)+'px'});
		$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
		
		$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	
		$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
		$('.serv-overlay').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
		
		
		$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-140)+'px'});
		$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-150)+'px'});
		$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-200)+'px'});
	
		$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
		topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
	
		$('.three').css({'width':($(window).width()/3)+'px'});
		$('#paquetes').css({'height':($(window).height()-70)+'px'});

	} 
	
	if (windowsize < 760) {
		$('#scrolldown').css({'bottom':(($(window).height()/2)-160)+'px'});
		
		$('#serv_cont .columns').css({'height':($(window).height()+90)+'px'});
		$('.serv_intro').css({'top':(($(window).height()/2)-($('.serv_intro').height()/2))+'px'});
		
		
		$('.serv-overlay-hover').css({'width':$(window).width()+'px'});
		$('.serv-overlay-hover').css({'height':($(window).height()+90)+'px'});
		
		$('.serv-overlay').css({'width':$(window).width()+'px'});
		$('.serv-overlay').css({'height':($(window).height()+90)+'px'});
		
		topBtnPrecios = $(window).height()+12;
		$('.serv_prices_btn').css({'top':($(window).height()+12)+'px'});
	}
	

	
	
	
	
	$(window).resize(function(){
		var windowsize = $(window).width();
		
		
		$('#home').css({'height':($(window).height())+'px'});
		
		
		
		$('#home_0').css({'height':($(window).height())+'px'});
		$('#home_1').css({'height':($(window).height())+'px'});
		$('#home_2').css({'height':($(window).height())+'px'});
		$('#home_3').css({'height':($(window).height())+'px'});
		
		
		$('#slidesContainer').css({'top':(($(window).height()/2)-($('#slidesContainer').height()/2))+'px'});
		
		
		if (windowsize > 760 && windowsize <= 1024) {
			
			$('#scrolldown').css({'bottom':(($(window).height()/2)-310)+'px'});
			
			$('#colorcase').css({'height':($(window).height())+'px'});
			$('#servicios').css({'height':($(window).height())+'px'});
			$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
			$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay-hover').css({'height':($(window).height()-$('#servicios_t').height())+'px'});
	
			$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay').css({'height':($(window).height()-$('#servicios_t').height())+'px'});
			
			$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-100)+'px'});
			$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-110)+'px'});
			$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-148)+'px'});
		
		
			$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
			topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
		
	
			$('.three').css({'width':(($(window).width()/3)-20)+'px'});
		
			$('#paquetes').css({'height':($(window).height()-70)+'px'});
		} 
		
		if (windowsize >= 1024 && windowsize <= 1280) {
		
			$('#scrolldown').css({'bottom':(($(window).height()/2)-262)+'px'});
		
			$('#colorcase').css({'height':($(window).height())+'px'});
			$('#servicios').css({'height':($(window).height()-90)+'px'});
			$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
		
			$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	
			$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
		
		
			$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-100)+'px'});
			$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-110)+'px'});
			$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-148)+'px'});
	
			$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
			topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
	
			$('.three').css({'width':(($(window).width()/3))+'px'});
	
	
	
			$('#paquetes').css({'height':($(window).height()-70)+'px'});
		
		} 
		
		if(windowsize > 1280) {
			
			$('#scrolldown').css({'bottom':(($(window).height()/2)-315)+'px'});
		
			$('#colorcase').css({'height':($(window).height())+'px'});
			$('#servicios').css({'height':($(window).height()-90)+'px'});
			$('.serv_intro').css({'top':(($(window).height()/2)-(($('.serv_intro').height()/2)+($('#servicios_t').height()-11)))+'px'});
		
			$('.serv-overlay-hover').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay-hover').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
	
			$('.serv-overlay').css({'width':($(window).width()/3)+'px'});
			$('.serv-overlay').css({'height':($(window).height()-($('#servicios_t').height()-11))+'px'});
		
		
			$('div#serv_tx_1').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-140)+'px'});
			$('div#serv_tx_2').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-150)+'px'});
			$('div#serv_tx_3').css({'top':((($(window).height()/2)-($('#servicios_t').height()+31))-200)+'px'});
	
			$('.serv_prices_btn').css({'top':($(window).height()-($('#servicios_t').height()-11)-160)+'px'});
	
			topBtnPrecios = $(window).height()-($('#servicios_t').height()-11)-160;
	
			$('.three').css({'width':($(window).width()/3)+'px'});
	
	
	
			$('#paquetes').css({'height':($(window).height()-70)+'px'});
		} 
		
		
		if (windowsize < 760) {
			$('#scrolldown').css({'bottom':(($(window).height()/2)-160)+'px'});
		
			$('#serv_cont .columns').css({'height':($(window).height()+90)+'px'});
			$('.serv_intro').css({'top':(($(window).height()/2)-($('.serv_intro').height()/2))+'px'});
		
		
			$('.serv-overlay-hover').css({'width':$(window).width()+'px'});
			$('.serv-overlay-hover').css({'height':($(window).height()+90)+'px'});
		
			$('.serv-overlay').css({'width':$(window).width()+'px'});
			$('.serv-overlay').css({'height':($(window).height()+90)+'px'});
		
			topBtnPrecios = $(window).height()+12;
			$('.serv_prices_btn').css({'top':($(window).height()+12)+'px'});
		}
		
		
		
	});
});


$(function(){
	$('#maximage').maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
			timeout: 4000,
			pause: 1,
                    
		},
		onFirstImageLoaded: function(){
			jQuery('#cycle-loader').hide();
			jQuery('#maximage').fadeIn('slow');
		}
				
	 });
});			

$(document).ready(
	function() {  
		$("html").niceScroll({scrollspeed:60, mousescrollstep:10});
		
	}
);
	

$.extend($.easing, window.easing);


//SERVICIOS
$(document).ready(function() {
	$(this).scrollTop(0);
	$(window).scrollTop(0);
	
	//HOVER SERVICIOS
	$(".serv-overlay-hover").hover(
	    function(){
	        $(this).find(".serv-overlay").fadeTo( 300, 1 );
	    },
	    function(){
	        $(this).find(".serv-overlay").fadeTo( 300, 0 );
	    }
	);
	
	// FAQS
	$("#faqs dd").hide();
	$("#faqs dt").click(function () {
		$(this).next("#faqs dd").slideToggle(500);
		$(this).toggleClass("expanded");
	});
	
	$(".fancybox").fancybox({
		maxWidth	: 800,
		maxHeight	: 500,
		fitToView	: true,
		width		: '94%',
		height		: '100%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'fade',
		closeEffect	: 'fade',
		helpers : {
			overlay : {
				css : {'background' : 'rgba(224, 236, 235, 0.95)'},
				locked : true,
			}
		},
		afterClose : function() {
			location.reload();
			return;
		}   
	});

	//PROMO
	$("#blog-promo").click(function() {
		$.fancybox({
			//'orig'			: $(this),
			'padding'		: 0,
			'href'			: 'http://colorcase.com.mx/wp-content/themes/colorcase/images/banners/_cc_mom_big.jpg',
			'title'   		: 'Coniente a tu Mamá',
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic'
		});
    })
	
	$('#btn_return').click(function(){
		$("#app-datetime").fadeTo(300, 0, function() {
			$(this).hide();
		    $("#app-services").delay(100).fadeTo( 300, 1 );
			$("#app-title-right").removeClass("app-title-right-s2");
			$("#app-title-right").addClass("app-title-right-s1");
		});
	});

	$(".serv_prices_btn").hover(
	    function(e){
			e.preventDefault();
			$(this).animate({top: topBtnPrecios-300}, 700, function() {
			    $(this).find( ".serv_prices_container" ).fadeTo( 300, 1 );
			});
	    },
	    function(){
			$(this).animate({top: topBtnPrecios}, 700, function() {
			    $(this).find( ".serv_prices_container" ).fadeTo( 300, 0 );
			});
	    }
	);
	
	$('.serv_prices_btn').click(function(){
		
	});
	
	
	//SERVICIOS
	var serviceId
	var sselect
	var sprice
	
	$('.app-services-item').hover(
	  	function() {
		  	$( this ).addClass( "hover" );
		}, function() {
			$( this ).removeClass( "hover" );
  		}
    );
	
	 
	 var servicios_ar = [];
	 $('#book_appointment_next').click(function(){
		 servicios_ar = [];
		 if (windowsize < 760) {
		 	$(".app-services-item-mob input[type=checkbox]:checked").each(function (){
				 servicios_ar.push($(this).val());
			 });
	 	} else {
   			 $(".app-services-item input[type=checkbox]:checked").each(function (){
   			 	servicios_ar.push($(this).val());
   		 	});
	 	}
		 
		 if(servicios_ar.length > 0){
			 
			 $('#birs_appointment_service').val(servicios_ar.join("\n\n"));
			 
			 
			 $("#app-services").fadeTo(300, 0, function() {
				 $(this).hide();
				 $("#app-info").delay(100).fadeTo( 300, 1 );
				 $("#app-title-right").removeClass("app-title-right-s1");
				 $("#app-title-right").addClass("app-title-right-s2");
			 });
			 //alert(servicios_ar.join("\n"))
		 } else {
			$('#birs_service_error').fadeIn('fast'); 
		 }
		 
	 });
	 
	 
	 $('#book_appointment').click(function(){
		 $('.birs_error').fadeOut('slow');
		 var error = false;
		 
 		var name = $('input#birs_client_name_first').val();
 		if(name == "" || name == " ") {
 			$('#birs_client_name_first_error').fadeIn('fast');
 			error = true;
 		}
		
		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
		var email = $('input#birs_client_email').val();
		if (email == "" || email == " ") {
			$('#birs_client_email_error').html('Ingresa tu email');
			$('#birs_client_email_error').fadeIn('fast');
			error = true;
		}else if (!email_compare.test(email)) {
			$('#birs_client_email_error').html('Ingresa un email válido'); 
			$('#birs_client_email_error').fadeIn('fast');
			error = true;
		}
		
 		var phone = $('input#birs_client_phone').val();
 		if(phone == "" || phone == " ") {
 			$('#birs_client_phone_error').fadeIn('fast');
 			error = true;
 		}
		
		if(error == true) {
			$('#birs_booking_error').slideDown('fast');
			return false;
		}
		
		var data_string = $('#ajax-form').serialize();
		//alert(data_string);
		
		$.ajax({
			type: "POST",
			url: $('#ajax-form').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				}*/
				$("#app-info").fadeTo(300, 0, function() {
					$(this).hide();
				    $("#app-success").delay(100).fadeTo( 300, 1 );
					$("#app-title-right").removeClass("app-title-right-s2");
					$("#app-title-right").addClass("app-title-right-s3");
					$(".app-success-tx").html(servicios_ar.join("<br>"));
					
				});
			},
			success: function() {
				$("#app-info").fadeTo(300, 0, function() {
					$(this).hide();
				    $("#app-success").delay(100).fadeTo( 300, 1 );
					$("#app-title-right").removeClass("app-title-right-s2");
					$("#app-title-right").addClass("app-title-right-s3");
					$(".app-success-tx").html(servicios_ar.join("<br>"));
					
				});
			}
		});

		return false; 
		
		
	 });
	 
	 //MOVE CITA
 	
	$('#finish_appointment').click(function(){
		$.fancybox.close();
	});
	
});



$(document).ready(function() {
	// init the controller
	var controller;
	
	if (Modernizr.touch) {
	 	$(window).scroll(function() {
	 	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
			   $( "#haz" ).animate({bottom: 45}, 250 );
		   
	 	   	} else {
				$( "#haz" ).animate({bottom: 0}, 250 );
	 	   	}
	 	});
	} else {
		
		var stp = 0;
		
		
  		controller = new ScrollMagic({
  			globalSceneOptions: {
  				triggerHook: "onLeave"
  			}
  		});
		
		var pinani = new TimelineMax()
		.add(TweenMax.to("#home_1", 2, {height: $(window).height(), delay:0, ease: Quart.easeOut}))
		.add(TweenMax.to("#home_2", 2, {height: $(window).height(), delay:0, ease: Quart.easeOut}))
		.add(TweenMax.to("#home_3", 2, {height: $(window).height(), delay:0, ease: Quart.easeOut}))
		.add(TweenMax.to("#haz", 1, {height: 90, ease: Quart.easeOut}))
	
		var scrollPos = controller.scrollPos();
	
		var scene = new ScrollScene({
				duration: 5000
			})
			.on("progress", function () {
				var scrollPos = controller.info("scrollPos");
				if(scrollPos > 0 && scrollPos < 35){
					stp = 0;
				}
				if(scrollPos > 35 && scrollPos < 1156){
					stp = 1;
				}
				if(scrollPos > 1156 && scrollPos < 1984){
					stp = 2;
				}
				if(scrollPos > 1984 && scrollPos < 3162){
					stp = 3;
				}
				
				//console.log(scrollPos);
			})
			.on("end", function (e) {

			})
			.setTween(pinani)
			.setPin("#content-wrapper")
			.addTo(controller);
	
	
		var circlesOff = new TimelineMax()
	
		.add(TweenMax.to("#slide_1 img", 0.5, {autoAlpha: 0, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_2 img", 0.5, {autoAlpha: 0, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_3 img", 0.5, {autoAlpha: 0, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_3 img", 0.5, {autoAlpha: 0, ease: Quart.easeOut}))
	
		var sceneCircles = new ScrollScene({
				triggerElement: "#content-wrapper",
				duration: 5000
			})
			.setTween(circlesOff)
		
			.addTo(controller);	
		
	
		var circlesOn = new TimelineMax()
		.add(TweenMax.to("#slide_2 img", 0.5, {autoAlpha: 1, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_3 img", 0.5, {autoAlpha: 1, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_4 img", 0.5, {autoAlpha: 1, ease: Quart.easeOut}))
		.add(TweenMax.to("#slide_4 img", 0.5, {autoAlpha: 1, ease: Quart.easeOut}))
	
		var sceneCircles = new ScrollScene({
			triggerElement: "#content-wrapper",
			duration: 5000
		})
		.setTween(circlesOn)
		.addTo(controller);	
			
		
	
		//BTN
		$('#slide_1').click(function(){
			 stp = 0;
			 scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: 0, ease: Quart.easeOut}}));
		});
		$('#slide_2').click(function(){
			 stp = 1;
			 scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*2)-300, ease: Quart.easeOut}}));
		});
		$('#slide_3').click(function(){
			stp = 2;
			 scene.add(TweenMax.to($(window),1.5, {scrollTo: {y: ($(window).height()*3)-200, ease: Quart.easeOut}}));
		});
		$('#slide_4').click(function(){
			stp = 3;
			 scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*4)+250, ease: Quart.easeOut}}));
		});
		$('#slide_down').click(function(){
			switch(stp) {
			    case 0:
					stp = 1;
			        scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*2)-300, ease: Quart.easeOut}}));
			        break;
			    case 1:
					stp = 2;
			        scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*3)-200, ease: Quart.easeOut}}));
			        break;
			    case 2:
					stp = 3;
			        scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*4)+250, ease: Quart.easeOut}}));
			        break;
			    case 3:
			        scene.add(TweenMax.to($(window), 2, {scrollTo: {y: ($(window).height()*8)-90, ease: Quart.easeOut}}));
			        break;		
			}
		});
		
		
		
		$('#scrolldown').click(function(){
			switch(stp) {
			    case 0:
					stp = 1;
			        scene.add(TweenMax.to($(window),1.5, {scrollTo: {y: ($(window).height()*2)-300, ease: Quart.easeOut}}));
			        break;
			    case 1:
					stp = 2;
			        scene.add(TweenMax.to($(window), 1.5, {scrollTo: {y: ($(window).height()*3)-200, ease: Quart.easeOut}}));
			        break;
			    case 2:
					stp = 3;
			        scene.add(TweenMax.to($(window),1.5, {scrollTo: {y: ($(window).height()*4)+250, ease: Quart.easeOut}}));
			        break;
			    case 3:
			        scene.add(TweenMax.to($(window), 2, {scrollTo: {y: ($(window).height()*8)-90, ease: Quart.easeOut}}));
			        break;		
			}
			 
		});
		
		
	 	$(window).scroll(function() {
	 	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	 		   scene.add(TweenMax.to("#haz", 1, {bottom: 45, ease: Strong.easeOut}))
	 	   	} else {
	 	   	   scene.add(TweenMax.to("#haz", 1, {bottom: 0, ease: Strong.easeOut}))
	 	   	}
	 	});
		
		
	}
	///
	
	
});

