/* ------------ VARS ------------ */
if (navigator.appVersion.indexOf("Win")!=-1) {
	$('head').append('<link rel="stylesheet" href="css/two_fonts_win.css" type="text/css" />');
} else {
   $('head').append('<link rel="stylesheet" href="css/two_fonts.css" type="text/css" />');
}

$('#intro-video').get(0).pause();

var $window     = $(window);
var $body       = $('body');
var $base       = $('#base-layer');
var w = $(window).width();
var h = $(window).height();
var external = true;


/*------------- MOVIL ---------------*/
var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
if(isiPhone > -1){
   //$('#v-movil').show();  
}
if(isiPad > -1){
   $('#v-movil').show();   
}

/* ------------ PRELOAD ------------ */
$(document).ready(function(){
	
	$( "#loader-container" ).delay(4000).animate({
		top: "-100%",
		}, 1500, "linear", function() {
			//$( this ).css( "top", "100%" );
			//$('.main-video').jPlayer('play')
			$('#intro-video').get(0).play();
			$('.video > div:first-child').fadeTo(500,1);
	});
});

'use strict;'

$(function() {
	$('#loader-container .loader').animate({'opacity': '1'});
});

function onLoaderFinish() {
	$('.video > div:first-child').show();
}

function updatePosition(){
	$('#two').css('top', '-100%');
	$('#que').css('top', '-100%');
	$('#como').css('top', '-100%');
	$('#ctgoria').css('top', '-100%');
	$('#contacto').css('top', '-100%');
	$('#wild-blog').css('top', '-100%');
}

/* ------------ RESIZE ------------ */
function updateSize() {
	w = $(window).width();
	h = $(window).height();
	
	//VIDEO MOVIL
	if (window.matchMedia("(orientation: portrait)").matches) {
	   	$('#v-movil').hide();
	}

	if (window.matchMedia("(orientation: landscape)").matches) {
	   	if(isiPad > -1){
			$('#v-movil').show();
		}
	}
	
	$('img.full, div.full').each(function(index){
		if(h/w >= 735/1200){
			$(this).css('height', Math.ceil( h ));
			$(this).css('width', Math.ceil( h * 1200/735 ));
			
			dif = Math.round((w - parseInt($(this).width())) * parseFloat($(this).attr('data-position-x')) );

			$(this).css('margin-left', dif + "px");
			$(this).css('margin-top', "0px");
		} else {
			$(this).css('width', Math.ceil( w ));
			$(this).css('height', Math.ceil( w * 735/1200 ));

			dif = Math.round((h - parseInt($(this).height())) * parseFloat($(this).attr('data-position-y')) );

			$(this).css('margin-top', dif + "px");
			$(this).css('margin-left', "0px");
		}
	});
	$('video.full').each(function(index){
		vw = $(this).attr('data-width');
		vh = $(this).attr('data-height');

		if(h/w >= vh/vw){
			$(this).css('height', Math.ceil( h ));
			$(this).css('width', Math.ceil( h * vw/vh ));

			dif = Math.round((w - parseInt($(this).width())) * parseFloat($(this).attr('data-position-x')) );
			$(this).css('margin-left', dif + "px");
			$(this).css('margin-top', "0px");
		} else {
			$(this).css('width', Math.ceil( w ));
			$(this).css('height', Math.ceil( w * vh/vw ));
			dif = Math.round((h - parseInt($(this).height())) * parseFloat($(this).attr('data-position-y')) );
			
			$(this).css('margin-top', dif + "px");
			$(this).css('margin-left', "0px");
		}
	});
}
$(window).resize(function() {
	updateSize();
});


/* ------------ READY ------------ */
$(document).ready(function(){
	
	updatePosition();
	updateSize()
	
	/* ----- LOADER ------ */
	var pathLogo = {
	    "simbolo": {
	        "strokepath": [
	            {
	                "path": "M 42.838 22.191 L 73.378 75",
	                "duration": 300
	            },
	            {
	                "path": "M 73.378 75 L 42.838 127.271",
	                "duration": 300
	            },
	            {
	                "path": "M 73.378 75 L 103.917 127.271",
	                "duration": 300
	            },
	            {
	                "path": "M 103.917 127.271 L 133.833 75",
	                "duration": 300
	            },
	            {
	                "path": "M 134.583 75 L 164.167 127.271",
	                "duration": 300
	            },
	            {
	                "path": "M 164.167 127.271 L 224.75 22.191",
	                "duration": 300
	            },
	            {
	                "path": "M 224.75 22.191 L 255.914 74.731",
	                "duration": 300
	            },
	            {
	                "path": "M 255.914 74.731 L 224.75 127.667",
	                "duration": 300
	            },
	            {
	                "path": "M 224.75 127.667 L 197.25 78.5",
	                "duration": 300
	            }
	        ],
	        "dimensions": {
	            "width": 300,
	            "height": 150
	        }
	    }
	}; 

	$('#simbolo').lazylinepainter( 
	 {
	    "svgData": pathLogo,
	    "strokeWidth": 12,
	    "strokeColor": "#000000"
	}).lazylinepainter('paint');
	
	/* ----- SHOW VIDEO ------ */
	$('#intro-video').show();
	
	
	/* ----- ADDRESS ------ */
	var $sectionAct = $('#home');
	var sectionQue = false;
	
	function initAddressHandler(){
		$.address.crawlable(true).init(function(event) {
			$('#header a:not([href^=http])').address();
			$('.hover a:not([href^=http])').address();
			$('#plataformas-container a:not([href^=http])').address();
			
			
		}).internalChange(function(event) {
			path_length = event.pathNames.length;
			section = event.pathNames[0];
			pat = event.pathNames[1];
			changeSection(section)
			//changeMenu(section)
			get_cat_post(pat)
			
		}).externalChange(function(event) {
			path_length = event.pathNames.length;
			section = event.pathNames[0];
			external = true;
			changeSectionExternal(section)
			//changeMenu(section)
			get_cat_post(pat)
		})
	}
	initAddressHandler();
	
	/* ------------ CHANGE SECTION INTERNAL------------ */
	function changeSection(sec, blogpost){
		
		
		
		switch (sec) {
			
			//HOME
			case 'home':
				
				$(".m-btn1").removeClass("selected");
				$(".m-btn2").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn4").removeClass("selected");
				
				
				$("#loader-container").fadeTo(1, 1);
				$("#loader-container").css( "top", "-100%" );
				$("#loader-container").css( "background", "#FFF" );
				$( "#loader-container" ).animate({top: "0%",}, 1500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					$sectionAct = $('#'+sec);
					$( "#loader-container" ).animate({top: "-100%",}, 1500, function() {
					});
					updateSize();
				});
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				
				$('#menu ul li a').delay(1250).queue( function(next){ 
					$(this).css( "color", "#FFF" );
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				
				sectionQue = false;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
				
				closeContacto();
				
			break;
			
			//TWO
			case 'two':
				
				
				$(".m-btn2").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn4").removeClass("selected");
				$(".m-btn6").removeClass("selected")
			
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#d51067" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );
				
				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$(".m-btn1").css( "color", "#d51067" ).addClass("selected");
				
				$('#two_container').delay(750).animate({top: "35%"}, 2000);
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					
					$('.sec-content').css( "top", "50%" );
					closeContacto()
					
				});
				
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				
				$('#menu ul li a').delay(1250).queue( function(next){ 
					$(this).css( "color", "#FFF" );
					next();
					$(".m-btn1").css( "color", "#d51067" ).addClass("selected"); 
				});
				
				sectionQue = false;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
				
			break;
			
			//QUE
			case 'que':
				
				$(".m-btn1").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn4").removeClass("selected");
				$(".m-btn6").removeClass("selected")
				
				$(".m-btn2").css( "color", "#ffc626" ).addClass("selected");
			
				
				
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#ffc626" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );
				
				
				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$('#que_container').delay(750).animate({top: "40%"}, 2000);
				
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){ 
					$(this).css( "color", "#FFF" );
					$(".m-btn2").css( "color", "#ffc626" ).addClass("selected");
					
					$(".m-btn1").find('.t').css( "color", "#fff" );
					$(".m-btn1").find('.w').css( "color", "#fff" );
					$(".m-btn1").find('.o').css( "color", "#fff" );
					next();
				});
				
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					$('.sec-content').css( "top", "50%" );
					
					//closeComo();
					updateSize();
					closeContacto()
				
					
				});
				
				//sectionQue = true;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
		
			break;
			
			//COMO
			case 'como':
			
				$(".m-btn1").removeClass("selected");
				$(".m-btn2").removeClass("selected");
				$(".m-btn4").removeClass("selected");
				$(".m-btn6").removeClass("selected")
				
				$(".m-btn3").css( "color", "#00acc8" ).addClass("selected");
				
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#00acc8" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );
				
				
				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$('#como_container').delay(750).animate({top: "0%"}, 2000);
			
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					$('.sec-content').css( "top", "50%" );
					updateSize();
					
					closeque();
					
					closeContacto()
				});
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){ 
					$(this).css( "color", "#FFF" );
					$(".m-btn3").css( "color", "#00acc8" ).addClass("selected");
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				sectionQue = false;
				
			break;
			
			//PROYECTOS
			case 'ctgoria':
			
				$(".m-btn1").removeClass("selected");
				$(".m-btn2").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn6").removeClass("selected");
				
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#FFFFFF" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );
				
				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$('#proyectos_container').delay(750).animate({top: "20%"}, 2000);
			
				$(".m-btn4").css( "color", "#ffc626" ).addClass("selected");
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					$('.sec-content').css( "top", "50%" );
					updateSize();
					closeque();
					//closeComo();
				});
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two-black.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#000" );
					$(".m-btn4").css( "color", "#ffc626" ).addClass("selected"); 
					$(".m-btn1").find('.t').css( "color", "#000" );
					$(".m-btn1").find('.w').css( "color", "#000" );
					$(".m-btn1").find('.o').css( "color", "#000" );
					next(); 
				});
				
				sectionQue = true;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
				//actScroll();
				
				
			break;
			
			//CONTACTO
			case 'contacto':
			
				$(".m-btn1").removeClass("selected");
				$(".m-btn2").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn4").removeClass("selected");
				
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#FFFFFF" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );

				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$('#contacto_container').delay(750).animate({top: "33%"}, 2000);
			
				$(".m-btn6").css( "color", "#000" ).addClass("selected");
				
				$(".sp-content").addClass("show-sp-content");
				$("#tx-home-1 span").addClass("sp-top");
				$("#tx-home-2 span").addClass("sp-top");
				$("#contacto-cont").delay(7000).fadeTo(900,1);
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					$('.sec-content').css( "top", "50%" );
					updateSize();
					
				});
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#FFF" );
					$(".m-btn6").css( "color", "#000" ).addClass("selected"); 
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				
				sectionQue = false;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
			break;
			
			//BLOG
			case 'wild-blog':
			
				$(".m-btn1").removeClass("selected");
				$(".m-btn2").removeClass("selected");
				$(".m-btn3").removeClass("selected");
				$(".m-btn5").removeClass("selected");
				
				$("#loader-container").fadeTo(10, 1);
				
				$("#loader-container").css( "background", "#FFFFFF" );
				$("#loader-img").show();
				$("#simbolo").hide();
				
				$("#loader-container").css( "top", "100%" );
				$('#'+sec).css( "top", "100%" );

				$('#'+sec).animate({top: "0%"}, 2500);
				$sectionAct.delay(1250).fadeTo(100, 0);
				
				$('#blog_container').delay(750).animate({top: "0%"}, 2000);
				$(".m-btn5").css( "color", "#d51067" ).addClass("selected");
				
				$( "#loader-container" ).animate({top: "-100%",}, 2500, function() {
					$sectionAct.css( "top", "-100%" );
					$('#'+sec).css( "top", "0%" );
					//$( this ).css( "top", "100%" );
					$sectionAct.fadeTo(100, 1);
					$sectionAct = $('#'+sec);
					$('.sec-content').css( "top", "50%" );
					updateSize();
					//closeque();
					//closeComo();
				});
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two-black.png' width='100%'></a>");
				    next(); 
				  });
				
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#FFF" );
					$(".m-btn5").css( "color", "#d51067" ).addClass("selected"); 
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				
				sectionQue = false;
				$('#header').stop().animate({'top': '0px'}, 600, function() {});
			break;
			
			
		}
	}
	/* ------------ CHANGE SECTION EXTERNAL ------------ */
	function changeSectionExternal(sec, blogpost){
		
		
		
		$('#'+sec).delay(1250).queue( function(next){ 
			$(this).css( "top", "0%" );
			next();
		});
		$('.sec-content').css( "top", "50%" );
		
		switch (sec) {
			case 'two':
				$("#loader-container").css( "background", "#d51067" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
				
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('.m-btn1').find('.t').css( "color", "#ffc626" );
					$('.m-btn1').find('.w').css( "color", "#00acc8" );
					$('.m-btn1').find('.o').css( "color", "#d51067" );
					$('#two_container').css( "top", "35%" ); 
				});
				
				$sectionAct = $('#'+sec);
				
			break;
			case 'que':
				$("#loader-container").css( "background", "#ffc626" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
				
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('#que_container').css( "top", "40%" );
					
				});
				
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){ 
					$(this).css( "color", "#FFF" );
					$(".m-btn2").css( "color", "#ffc626" ).addClass("selected");
					next();
				});
				//sectionQue = true;
				$sectionAct = $('#'+sec);
				
			break;
			case 'como':
				$("#loader-container").css( "background", "#00acc8" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
			
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('#como_container').css( "top", "0%" );
					
				});
				$(".m-btn3").css( "color", "#00acc8" ).addClass("selected");
				$sectionAct = $('#'+sec);
				
			break;
			case 'ctgoria':
				$("#loader-container").css( "background", "#ffffff" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
				
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('#proyectos_container').css( "top", "20%" );
				});
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two-black.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#000" );
					$(".m-btn4").css( "color", "#ffc626" ).addClass("selected"); 
					next(); 
				});
				
				sectionQue = true;
				$sectionAct = $('#'+sec);
				
			break;
			case 'contacto':
				$("#loader-container").css( "background", "#ffffff" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
				
				$(".sp-content").addClass("show-sp-content");
				$("#tx-home-1 span").addClass("sp-top");
				$("#tx-home-2 span").addClass("sp-top");
				
				$("#contacto-cont").delay(7000).fadeTo(900,1);
				
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('#contacto_container').css( "top", "33%" );
					
				});
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#FFF" );
					$(".m-btn6").css( "color", "#000" ).addClass("selected"); 
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				$sectionAct = $('#'+sec);
				
			break;
			case 'wild-blog':
				$("#loader-container").css( "background", "#ffffff" );
				$("#loader-img").fadeTo(1,1);
				$("#simbolo").hide();
				
				
				$sectionAct.css( "top", "-100%" );
				$('#'+sec).delay(1250).queue( function(next){ 
					$(this).css( "top", "0%" );
					next();
					$('#blog_container').css( "top", "0%" );
					
				});
				$('#logo').delay(1250).queue( function(next){ 
				    $(this).html("<a href='/home/'><img alt='TWO' src='img/logo-two-black.png' width='100%'></a>");
				    next(); 
				  });
				$('#menu ul li a').delay(1250).queue( function(next){
					$(this).css( "color", "#FFF" );
					$(".m-btn5").css( "color", "#d51067" ).addClass("selected"); 
					$(".m-btn1").find('.t').css( "color", "#FFF" );
					$(".m-btn1").find('.w').css( "color", "#FFF" );
					$(".m-btn1").find('.o').css( "color", "#FFF" );
					next(); 
				});
				$sectionAct = $('#'+sec);
				
			break;
		}
	}
	/* 
	 * Lazy Line Painter - Path Object 
	 */ 
	
	var pathObj2 = {
	    "arrow_2": {
	        "strokepath": [
		            {
		                "path": "M94.405,23.208C60.5,16.8,64.01,24.39,35.833,26.221",
		                "duration": 600
		            },
		            {
		                "path": "M35.094,19.305  c0.039,4.872,0.245,9.806,0.048,14.654C29.983,34.353,24.055,28.95,19,27.309c5.5-1.783,9.989-6.551,15.441-8.509  c-0.39,0.768-0.895,1.436-1.44,2.1",
		                "duration": 600
		            },
		            {
		                "path": "M28.335,29.885  c-0.831-0.056-1.593,0.258-1.657,0.014c1.159,0.225,2.448,0.377,3.617,0.545c-2.476-1.525-5.233-2.512-8.057-3.18  c2.451,0.703,4.814,2.052,7.488,2.108c0.031-0.045-0.658-0.457-0.688-0.572c1.192,0.346,2.752,0.218,3.879,0.44  c-1.377-1.407-3.124-2.371-4.976-3.074c0.889,0.383,1.937,0.729,2.832,1.104c-1.07-0.545-2.136-1.47-2.959-2.039  c0.928,0.38,2.121,0.533,3.068,0.871c-0.627-0.653-1.163-1.785-1.912-2.485c0.946,0.316,1.917,0.564,2.821,1.029  c-0.375-0.257-0.977-0.655-1.231-1.028c1.002,0.403,1.762,0.699,2.81,1.001c-0.752-1.336-1.376-0.645-2.453-1.07",
		                "duration": 1300
		            }
		        ],
	        "dimensions": {
	            "width": 100,
	            "height": 110
	        }
	    }
	}; 
	var pathObj1 = {
	    "arrow_1": {
	        "strokepath": [
			            {
			                "path": "M125.811,37.426  C96.834,24.5,58.5,27.167,41.167,47.833",
			                "duration": 600
			            },
			            {
			                "path": "M32.441,41.062  c5.358,5.438,12.014,9.688,17.452,15.151c-4.807-0.043-12.458-0.321-15.929,2.812c0.935-4.699-1.98-12.57-1.174-15.543",
			                "duration": 600
			            },
			            {
			                "path": "M43.826,52.726  c-1.075,1.248-2.42,2.01-4.461,2.084c0.741-0.135,1.35-0.297,2.217-0.369c-2.189,0.002-4.532,0.201-6.533,0.668  c2.318-0.092,4.72-0.325,6.793-1.186c-1.975-0.246-3.941-0.266-5.836-0.061c1.216-0.447,2.363-1.441,3.587-1.936  c-1.478,0.036-3.083-0.314-4.564-0.326c1.857-0.152,3.352-1.07,4.627-1.894c-0.777,0.024-2.071-0.155-2.997-0.147  c0.943-0.302,1.933-1.002,2.701-1.336c-1.214-0.111-1.674-0.029-2.682,0.078c-0.543-0.189,0.141-0.822-0.561-1.041  c-0.869,0.026-1.84,0.161-2.695,0.065c0.152,0.287,1.242-0.545,1.365-0.599c-0.521-0.03-1.626-0.016-2.273-0.278  c1.603-0.015,3.839,1.153,2.833,0.731",
			                "duration": 1300
			            }
			        ],
	        "dimensions": {
	            "width": 200,
	            "height": 100
	        }
	    }
	};
	var pathObj = {
	    "arrow_3": {
	        "strokepath": [
			            {
			                "path": "M75.096,18.13c4.737,30.037-3.596,54.537-42.455,52.111",
			                "duration": 600
			            },
			            {
			                "path": "M32.641,58.689  c-0.799,7.592,0.145,15.433-0.624,23.103c-3.019-3.74-7.662-9.827-12.286-10.521c4.224-2.262,8.454-9.51,11.262-10.775",
			                "duration": 600
			            },
			            {
			                "path": "M30.859,74.892  c-1.647-0.038-3.089-0.593-4.443-2.123c0.574,0.486,1.086,0.854,1.693,1.478c-1.392-1.689-3.033-3.373-4.664-4.623  c1.543,1.733,3.249,3.441,5.229,4.496c-1.064-1.682-2.297-3.214-3.659-4.547c1.118,0.655,2.614,0.91,3.772,1.541  c-0.966-1.118-1.714-2.581-2.646-3.732c1.296,1.338,2.955,1.91,4.401,2.373c-0.513-0.586-1.195-1.699-1.789-2.41  c0.832,0.537,2.001,0.857,2.747,1.238c-0.684-1.008-1.04-1.312-1.763-2.021c-0.198-0.54,0.725-0.414,0.448-1.095  c-0.572-0.654-1.292-1.319-1.762-2.04c-0.125,0.299,1.209,0.613,1.329,0.674c-0.308-0.422-1.021-1.266-1.229-1.933  c1.03,1.229,1.547,3.698,1.234,2.653",
			                "duration": 1300
			            }
			        ],
	        "dimensions": {
	            "width": 100,
	            "height": 120
	        }
	    }
	};
	var pathObj4 = {
	    "arrow_4": {
	        "strokepath": [
			            {
			                "path": "M62.57,21.169C51.5,28.5,33.5,52.31,52.166,70.167",
			                "duration": 600
			            },
			            {
			                "path": "M47.404,76.799  c2.884-3.928,5.672-8.002,8.73-11.768c4.367,2.771,5.886,10.646,8.953,14.986c-5.475-1.861-11.924-0.729-17.464-2.423  c0.773-0.381,1.576-0.615,2.411-0.82",
			                "duration": 600
			            },
			            {
			                "path": "M59.15,72.368  c0.631,0.541,1.43,0.745,1.336,0.98c-0.793-0.874-1.736-1.769-2.572-2.602c1.072,2.704,2.688,5.145,4.553,7.37  c-1.543-2.031-2.63-4.525-4.738-6.17c-0.05,0.017,0.256,0.76,0.209,0.869c-0.747-0.99-2.074-1.821-2.844-2.675  c0.262,1.953,1.084,3.771,2.146,5.441c-0.481-0.84-1.114-1.742-1.61-2.58c0.534,1.077,0.834,2.456,1.153,3.405  c-0.515-0.86-1.379-1.696-1.938-2.534c0.112,0.9-0.135,2.127,0.044,3.135c-0.568-0.817-1.197-1.599-1.644-2.511  c0.146,0.431,0.391,1.107,0.37,1.559c-0.561-0.923-0.992-1.614-1.65-2.482c-0.197,1.521,0.716,1.339,1.325,2.326",
			                "duration": 1300
			            }
			        ],
			        "dimensions": {
			            "width": 100,
			            "height": 120
			        }
	    }
	};
	var pathObj5 = {
	    "arrow_5": {
	        "strokepath": [
			            {
			                "path": "M8.235,23c0.5,27.638,12.062,46.81,70.75,41.87",
			                "duration": 600
			            },
			            {
			                "path": "M79.03,54.096  c0.799,7.592-0.145,15.433,0.623,23.103c3.02-3.74,7.662-9.827,12.287-10.521c-4.225-2.262-8.455-9.51-11.263-10.775",
			                "duration": 600
			            },
			            {
			                "path": "M80.812,70.298  c1.646-0.038,3.09-0.593,4.443-2.123c-0.574,0.486-1.087,0.854-1.693,1.478c1.392-1.689,3.033-3.373,4.664-4.623  c-1.543,1.733-3.248,3.441-5.229,4.496c1.063-1.682,2.297-3.214,3.658-4.547c-1.118,0.655-2.613,0.91-3.772,1.541  c0.966-1.118,1.714-2.581,2.646-3.732c-1.297,1.338-2.955,1.91-4.4,2.373c0.512-0.586,1.195-1.699,1.789-2.41  c-0.832,0.537-2.002,0.857-2.747,1.238c0.685-1.008,1.04-1.312,1.763-2.021c0.199-0.54-0.725-0.414-0.447-1.095  c0.572-0.654,1.292-1.319,1.762-2.04c0.125,0.299-1.21,0.613-1.33,0.674c0.309-0.422,1.021-1.266,1.229-1.933  c-1.029,1.229-1.547,3.698-1.234,2.653",
			                "duration": 1300
			            }
			        ],
			        "dimensions": {
			            "width": 100,
			            "height": 120
			        }
	    }
	};
	var pathObj6 = {
	    "arrow_6": {
	        "strokepath": [
		            {
		                "path": "M12.75,6.25C20,4.382,41.281-2,47.247,13.397",
		                "duration": 600
		            },
		            {
		                "path": "M41.317,17.866  c3.956-2.843,7.868-5.856,11.94-8.495c3.297,3.985,2.308,11.944,3.884,17.022c-4.631-3.465-11.115-4.379-15.86-7.703  c0.853-0.125,1.69-0.097,2.545-0.034",
		                "duration": 600
		            },
		            {
		                "path": "M53.858,17.283  c0.436,0.708,1.128,1.153,0.967,1.344c-0.484-1.074-1.103-2.217-1.642-3.269c0.183,2.904,0.968,5.724,2.053,8.416  c-0.839-2.408-1.101-5.114-2.599-7.333c-0.055,0,0.006,0.802-0.07,0.891c-0.407-1.17-1.409-2.371-1.88-3.42  c-0.354,1.938-0.133,3.92,0.361,5.838c-0.199-0.946-0.521-2-0.731-2.95c0.171,1.188,0.031,2.592,0.043,3.594  c-0.228-0.979-0.788-2.04-1.06-3.009c-0.171,0.889-0.787,1.98-0.926,2.997c-0.29-0.957-0.646-1.89-0.789-2.898  c0.006,0.454,0.028,1.176-0.129,1.599c-0.249-1.05-0.446-1.841-0.802-2.872c-0.659,1.385,0.266,1.497,0.542,2.622",
		                "duration": 1300
		            }
		        ],
			        "dimensions": {
			            "width": 100,
			            "height": 120
			        }
	    }
	};
	var pathObj7 = {
	    "arrow_7": {
	        "strokepath": [
			            {
			                "path": "M8.655,39.71  c21.5-18.756,83.845-23.966,121.831-6.466",
			                "duration": 600
			            },
			            {
			                "path": "M136.605,22.929  c-2.9,7.062-7.45,13.516-10.413,20.631c4.433-1.859,11.407-5.015,15.808-3.43c-2.646-3.995-2.929-12.384-4.802-14.83",
			                "duration": 600
			            },
			            {
			                "path": "M130.486,38.035  c1.468,0.748,3,0.944,4.918,0.24c-0.736,0.156-1.361,0.236-2.191,0.498c2.026-0.827,4.27-1.53,6.299-1.856  c-2.182,0.793-4.492,1.487-6.736,1.476c1.733-0.976,3.548-1.738,5.379-2.266c-1.296,0.047-2.732-0.439-4.053-0.433  c1.381-0.526,2.734-1.458,4.101-2.03c-1.776,0.562-3.508,0.279-4.999,0c0.727-0.271,1.857-0.927,2.717-1.271  c-0.985,0.078-2.169-0.195-3.004-0.213c1.079-0.562,1.537-0.661,2.51-0.943c0.431-0.381-0.441-0.708,0.126-1.176  c0.813-0.305,1.764-0.548,2.519-0.96c-0.031,0.323-1.356-0.034-1.49-0.037c0.471-0.225,1.499-0.631,1.999-1.119  c-1.489,0.594-3.117,2.522-2.347,1.751",
			                "duration": 1300
			            }
			        ],
	        "dimensions": {
	            "width": 200,
	            "height": 150
	        }
	    }
	};
	//MENU PRINCIPAL
	
	$(".m-btn1").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).find('.t').css( "color", "#ffc626" );
			$(this).find('.w').css( "color", "#00acc8" );
			$(this).find('.o').css( "color", "#d51067" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).find('.t').css( "color", "#000" );
				$(this).find('.w').css( "color", "#000" );
				$(this).find('.o').css( "color", "#000" );
			} else {
				$(this).find('.t').css( "color", "#FFF" );
				$(this).find('.w').css( "color", "#FFF" );
				$(this).find('.o').css( "color", "#FFF" );
			}
		}		
	  }
	);
	$(".m-btn2").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).css( "color", "#ffc626" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).css( "color", "#000" );
			} else {
				$(this).css( "color", "#FFF" );
			}
		}		
	  }
	);
	$(".m-btn3").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).css( "color", "#00acc8" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).css( "color", "#000" );
			} else {
				$(this).css( "color", "#FFF" );
			}
		}		
	  }
	);
	$(".m-btn4").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).css( "color", "#ffc626" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).css( "color", "#000" );
			} else {
				$(this).css( "color", "#FFF" );
			}
		}		
	  }
	);
	$(".m-btn5").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).css( "color", "#d51067" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).css( "color", "#000" );
			} else {
				$(this).css( "color", "#FFF" );
			}
		}		
	  }
	);
	$(".m-btn6").hover(
	  function() {
		if (!$(this).hasClass("selected")){
			$(this).css( "color", "#000" );
			
		}
	  }, function() {
		if (!$(this).hasClass("selected")){
			if(sectionQue){
				$(this).css( "color", "#000" );
			} else {
				$(this).css( "color", "#FFF" );
			}
		}		
	  }
	);
	
/* ------------- QUE --------------*/

	var $servActive
	
	$("#arrow_down").click(function(event){
		event.preventDefault();
		var target_offset = $("#que_r1").offset();
		var target_top = target_offset.top;

		$('#que').animate({scrollTop:target_top}, 1400);
	});
	
	
	/* ------------- QUE --------------*/
		var showall = false;
		var $servActive
		var show1 = false;
		var show2 = false;
		var show3 = false;
		var show4 = false;
		var show5 = false;
		var show6 = false;
		var show7 = false;
		
		$("#que_btn_1").hover(
			function() {
				if(!showall){
					if(!show1){
						showP1();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show1 = true;
					}
				}
		  	}, function() {
				if(!showall){
					//hideP1()
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);
		$("#que_btn_2").hover(
		  	function() {
				if(!showall){
					if(!show2){
						showP2();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show2 = true;
					}
				}	
		  	}, function() {
				if(!showall){
					//hideP2();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);
		$("#que_btn_3").hover(
		  	function() {
				if(!showall){
					if(!show3){
						showP3();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show3 = true;
					}
				}	
		  	}, function() {
				if(!showall){
					//hideP3();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);
		$("#que_btn_4").hover(
		  	function() {
				if(!showall){
					if(!show4){
						showP4();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show4 = true;
					}
				}
			}, function() {
				if(!showall){
					//hideP4();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);
		$("#que_btn_5").hover(
		  	function() {
				if(!showall){
					if(!show5){
						showP5();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show5 = true;
					}
				}	
			}, function() {
				if(!showall){
					//hideP5();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);
		$("#que_btn_6").hover(
		  	function() {
				if(!showall){
					if(!show6){
						showP6();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show6 = true;
					}
				}	
			}, function() {
				if(!showall){
					//hideP6();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
			}
		);
		$("#que_btn_7").hover(
		  	function() {
				if(!showall){
					if(!show7){
						showP7();
						$(this).css({
							'transform':'rotate(90deg)',
							'-ms-transform':'rotate(90deg)',
							'-webkit-transform':'rotate(90deg)'
						})
						show7 = true;
					}
				}	
		  	}, function() {
				if(!showall){	
					//hideP7();
					/*$(this).css({
						'transform':'rotate(0deg)',
						'-ms-transform':'rotate(0deg)',
						'-webkit-transform':'rotate(0deg)'
					})*/
				}	
		  	}
		);

		$('.btn_down').click(function(){
			$('#que_container_s1').fadeTo(400,0);
			$(this).fadeTo(1000, 0, function() {
			    $(this).hide()
			  });
			$('#que_container_s2').delay(500).animate({'margin-top': '-430px'}, 1000, function() {
				$('.tx_ci').fadeTo(400,1);
				$('#simbolo-two').fadeTo(400,1);
				$('#btn-show').fadeTo(400,1);

			});
		});

		function showP1(){
			$('#serv1').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv1').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv1').find(".arrow").fadeTo(1, 1);
			$('#arrow_1').lazylinepainter( 
			 {
			    "svgData": pathObj1,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP1(){
			$('#serv1').find(".icon_serv").stop();
			$('#serv1').find(".que_contenidos_tit").stop();
			$('#serv1').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv1').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv1').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP2(){
			$('#serv2').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv2').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv2').find(".arrow").fadeTo(1, 1);
			$('#arrow_2').lazylinepainter( 
			 {
			    "svgData": pathObj2,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP2(){
			$('#serv2').find(".icon_serv").stop();
			$('#serv2').find(".que_contenidos_tit").stop();
			$('#serv2').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv2').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv2').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP3(){
			$('#serv3').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv3').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv3').find(".arrow").fadeTo(1, 1);
			$('#arrow_3').lazylinepainter( 
			 {
			    "svgData": pathObj,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP3(){
			$('#serv3').find(".icon_serv").stop();
			$('#serv3').find(".que_contenidos_tit").stop();
			$('#serv3').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv3').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv3').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP4(){
			$('#serv4').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv4').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv4').find(".arrow").fadeTo(1, 1);
			$('#arrow_4').lazylinepainter( 
			 {
			    "svgData": pathObj4,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP4(){
			$('#serv4').find(".icon_serv").stop();
			$('#serv4').find(".que_contenidos_tit").stop();
			$('#serv4').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv4').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv4').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP5(){
			$('#serv5').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv5').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv5').find(".arrow").fadeTo(1, 1);
			$('#arrow_5').lazylinepainter( 
			 {
			    "svgData": pathObj5,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP5(){
			$('#serv5').find(".icon_serv").stop();
			$('#serv5').find(".que_contenidos_tit").stop();
			$('#serv5').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv5').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv5').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP6(){
			$('#serv6').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv6').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv6').find(".arrow").fadeTo(1, 1);
			$('#arrow_6').lazylinepainter( 
			 {
			    "svgData": pathObj6,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP6(){
			$('#serv6').find(".icon_serv").stop();
			$('#serv6').find(".que_contenidos_tit").stop();
			$('#serv6').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv6').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv6').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		function showP7(){
			$('#serv7').find(".que_contenidos_tit").delay(1200).fadeTo(700, 1)
			$('#serv7').find(".icon_serv").delay(1000).fadeTo(700, 1);
			$('#serv7').find(".arrow").fadeTo(1, 1);
			$('#arrow_7').lazylinepainter( 
			 {
			    "svgData": pathObj7,
			    "strokeWidth": 1,
			    "strokeColor": "#000000"
			}).lazylinepainter('erase').lazylinepainter('paint');
		}
		function hideP7(){
			$('#serv7').find(".icon_serv").stop();
			$('#serv7').find(".que_contenidos_tit").stop();
			$('#serv7').find(".que_contenidos_tit").stop().fadeTo(300, 0);
			$('#serv7').find(".icon_serv").stop().fadeTo(300, 0);
			$('#serv7').find(".arrow").stop().fadeTo( 300 , 0, function() {});
		}
		
		function closePlat(){
			btnShowV = false;
			$(this).fadeTo( 300 , 0, function() { $(this).html('cerrar').fadeTo(300, 1) });
		}

		var btnShowV = true;
		
		$('#btn-show').click(function(){
			if(btnShowV){
				showP1();
				showP2();
				showP3();
				showP4();
				showP5();
				showP6();
				showP7();
				$(this).fadeTo( 300 , 0, function() { $(this).html('cerrar').fadeTo(300, 1) });
				btnShowV = false;
				showall = true
			} else {
				hideP1();
				hideP2();
				hideP3();
				hideP4();
				hideP5();
				hideP6();
				hideP7();
				$(this).fadeTo( 300 , 0, function() { $(this).html('ver todos').fadeTo(300, 1) });
				
				btnShowV = true;
				showall = false
			}
			
			
			
		});
	
	
	function closeque(){
		$('#header').animate({'top': '0px'}, 500, function() {});
		$('#que').animate({scrollTop:0}, 200);
	}
	
	$('#que').bind('scroll', function(){
		if($(this).scrollTop() >= 80){
			$('#header').stop().animate({'top': '-150px'}, 400, function() {});
		} else {
			$('#header').stop().animate({'top': '0px'}, 400, function() {});
		}
		
	})	
});



/* ------------- TWO --------------*/
$(function(){
	$('#maximage').maximage({
		cycleOptions: {
			fx: 'scrollHorz',
			speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
			timeout: 0,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 0,
			after:   onAfter,
			before:   onBefore,
		},
		onFirstImageLoaded: function(){
 			jQuery('#cycle-loader').hide();
			jQuery('#maximage').fadeIn('slow');
		}
	});
});




/* -------------  COMO  --------------*/

///// Scroll iphone
if(isiPhone > -1){
   	$('#como').bind('scroll', function(){
		
		//alert($(this).scrollTop())
		
		if($(this).scrollTop() >= 30){
			$('#header').stop().animate({'top': '-150px'}, 600, function() {});
		} else {
			$('#header').stop().animate({'top': '0px'}, 600, function() {});
		}

	}) 
}



var c1 = 260;
var c2 = 290;
var r1 = 115;
var circle1 = 130;
var circle2 = 129.99;
var iconsize = 228;
var iconsx = 16;
var iconsy = 16;

if(w < 481 ){
	c1 = 110;
	c2 = 150;
	r1 = 50;
	circle1 = 50;
	circle2 = 49.99;
	iconsize = 99;
	iconsx = 1;
	iconsy = 1;
}
if(w >= 481 && w <= 568 ){
	c1 = 110;
	c2 = 150;
	r1 = 50;
	circle1 = 50;
	circle2 = 49.99;
	iconsize = 99;
	iconsx = 1;
	iconsy = 1;
}



//$(window).load(function() {
	var r = Raphael("como_circle", c1, c2),
	 	R = r1,
		init = true,
		param = {stroke: "#fff", "stroke-width": 2}
	
	r.circle(circle1, circle1, r1).attr({ stroke: '#fff', fill: 'none',"stroke-width": 2 });
	var icon = r.image("img/icono_knowmap.png", iconsx, iconsy, iconsize, iconsize).toFront();
	//var title = r.text(130, 130, '').attr({font: '16px Quicksand',fill: '#fff'}).toBack();
	
	// Custom Attribute
	r.customAttributes.arc = function (value, total, R) {
		var alpha = 360 / total * value,
		a = (90 - alpha) * Math.PI / 180,
		x = circle1 + R * Math.cos(a),
		y = circle1 - R * Math.sin(a),
		color = "#00cced",
		path;
		if (total == value) {
			path = [["M", circle1, circle1 - R], ["A", R, R, 0, 1, 1, circle2, circle1 - R]];
		} else {
			path = [["M", circle1, circle1 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
		}
		return {path: path, stroke: color};
	};
	
	
	var sec = r.path().attr({arc: [0, 60, R]});
	function updateVal(value, total, R, hand, id) {
		hand.animate({arc: [value, total, R]}, 950, "linear");
	}
	
	updateVal(12, 60, r1, sec, 2);
	
	var txProcess = [
		"<div class='como_c'><span class='tx-bold'>Búsqueda e identificación de oportunidades para la generación de la mejor solución</span><br>Profundizamos en la información para hacer un diagnóstico que nos permita generar la mejor solución del objetivo<br>obteniendo dos niveles de análisis para la identificación de nuevas oportunidades de negocio.</div>",
		"<span class='tx-bold'>Generación de ideas únicas y diferenciadas para resolver el objetivo</span><br>Rompemos con tu jornada ordinaria de trabajo para entrar en un proceso de inspiración co-creación e ideación<br>con el objetivo de explorar nuevos caminos que abran las puertas a las grandes ideas y soluciones.",
		"<span class='tx-bold'>Desarrollo de las soluciones propuestas a través de la definición del producto / servicio / comunicación</span><br>Filtramos y priorizamos  las mejores ideas  para generar una radiografía de acuerdo al target, estilo de vida, tendencias y motivaciones que nos permita diferenciarnos de la competencia, analizamos y definimos el tamaño de la oportunidad de negocio y<br>desarrollamos la estrategia (corto, mediano o largo plazo)",
		"<span class='tx-bold'>Validación con el consumidor para asegurar la relevancia</span><br>Convertimos las ideas en productos o servicios que el target final realmente quiera, necesite y compre, <br>utilizando un proceso de evaluación cuantitativo  y/o cualitativo"
	];
	
	
	var $sectionAct = $('#knowmap');
	var secComo = 0;
	var secTx = ["knowmap-tit","ideas-tit","wild-tit","survival-tit","top-tit"];
	var secIcon = ["icono_knowmap","icono_ideas","icono_wild","icono_survival","icono_top"];
	
	icon.mouseover(function(){
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/"+secTx[secComo]+".png" }).animate({ opacity: 1 }, 500, '<');
		});
		
	}).mouseout(function(){
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/"+secIcon[secComo]+".png" }).animate({ opacity: 1 }, 500, '<');
		});
	});

	
	$('#knowmap').click(function(){
		updateVal(12, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_knowmap.png" }).animate({ opacity: 1 }, 500, '<');
		});

		$("#como_tx").find("#c"+secComo).fadeTo( 500 , 0, function() {
			$("#como_tx").find("#c"+secComo).hide();
			secComo = 0;
		    $("#como_tx").find("#c"+secComo).fadeTo(500,1);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#knowmap');
		
		$(this).addClass( "selected" );
		$(this).find(".como_menu_item_image").css({
			"background": "url(img/circle_fill.png) no-repeat",
			"color": "#161616"
		});
		$('#btn-top').css({
			"background": "url(img/bck-btn-top.png) no-repeat",
			"color": "#FFF"
		});
		
	});
	$('#ideas').click(function(){
		updateVal(24, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_ideas.png" }).animate({ opacity: 1 }, 500, '<');
		});
		
		$("#como_tx").find("#c"+secComo).fadeTo( 500 , 0, function() {
			$("#como_tx").find("#c"+secComo).hide();
			secComo = 1;
	    	$("#como_tx").find("#c"+secComo).fadeTo(500,1);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#ideas');

		$(this).addClass( "selected" );
		$(this).find(".como_menu_item_image").css({
			"background": "url(img/circle_fill.png) no-repeat",
			"color": "#161616"
		});
		$('#btn-top').css({
			"background": "url(img/bck-btn-top.png) no-repeat",
			"color": "#FFF"
		});
	});
	$('#wild').click(function(){
		updateVal(36, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_wild.png" }).animate({ opacity: 1 }, 500, '<');
		});
		$("#como_tx").find("#c"+secComo).fadeTo( 500 , 0, function() {
			$("#como_tx").find("#c"+secComo).hide();
			secComo = 2;
    		$("#como_tx").find("#c"+secComo).fadeTo(500,1);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#wild');

		$(this).addClass( "selected" );
		$(this).find(".como_menu_item_image").css({
			"background": "url(img/circle_fill.png) no-repeat",
			"color": "#161616"
		});
		$('#btn-top').css({
			"background": "url(img/bck-btn-top.png) no-repeat",
			"color": "#FFF"
		});
	});
	$('#survival').click(function(){
		updateVal(48, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_survival.png" }).animate({ opacity: 1 }, 500, '<');
		});
		$("#como_tx").find("#c"+secComo).fadeTo( 500 , 0, function() {
			$("#como_tx").find("#c"+secComo).hide();
			secComo = 3;
			$("#como_tx").find("#c"+secComo).fadeTo(500,1);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#survival');

		$(this).addClass( "selected" );
		$(this).find(".como_menu_item_image").css({
			"background": "url(img/circle_fill.png) no-repeat",
			"color": "#161616"
		});
		
		$('#btn-top').css({
			"background": "url(img/bck-btn-top.png) no-repeat",
			"color": "#FFF"
		});
		
	});
	
	$('#btn-top').click(function(){
		updateVal(60, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_top.png" }).animate({ opacity: 1 }, 500, '<');
		});
		$("#como_tx").find("#c"+secComo).fadeTo( 500 , 0, function() {
			$("#como_tx").find("#c"+secComo).hide();
			secComo = 4;
			$("#como_tx").find("#c"+secComo).fadeTo(500,1);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#btn-top');

		$(this).addClass( "selected" );
		$(this).css({
			"background": "url(img/bck_top_wild_over.png) no-repeat",
			"color": "#161616"
		});
	});
	
	//CLOSE COMO
	function closeComo(){
		
		updateVal(15, 60, r1, sec, 2);
		icon.animate({ opacity: 0 }, 500, '>', function(){
			this.attr({ src: "img/icono_knowmap.png" }).animate({ opacity: 1 }, 500, '<');
		});
		$('#tx').animate({ opacity: 0 }, 500, function(){
			$('#tx').html( "Know Map" ).animate({ opacity: 1 }, 500);
		});
		$('#como_tx').animate({ opacity: 0 }, 500, function(){
			$('#como_tx').html(txProcess[0]).animate({ opacity: 1 }, 500);
		});
		
		$sectionAct.removeClass("selected");
		$sectionAct.find(".como_menu_item_image").css({
			"background": "url(img/circle_stroke.png) no-repeat",
			"color": "#FFF"
		});
		$sectionAct = $('#knowmap');
		$(this).addClass( "selected" );
		$(this).find(".como_menu_item_image").css({
			"background": "url(img/circle_fill.png) no-repeat",
			"color": "#161616"
		});
	}
	
	
	//
	
	$("#knowmap").hover(
	  function() {
		if (!$(this).hasClass("selected")) {
			if(w < 481 ){
	    		$( this ).find(".como_menu_item_image").css({
					"background": "url(img/circle_fill.png) no-repeat center center",
					"color": "#161616"
				});
			} else {
				$( this ).find(".como_menu_item_image").css({
					"background": "url(img/circle_fill.png) no-repeat",
					"color": "#161616"
				});
			}
		}
	  }, function() {
		if (!$(this).hasClass("selected")) {
			if(w < 481 ){
	   			$( this ).find(".como_menu_item_image").css({
					"background": "url(img/circle_stroke.png) no-repeat center center",
					"color": "#FFF"
				});
			} else {
				$( this ).find(".como_menu_item_image").css({
					"background": "url(img/circle_stroke.png) no-repeat",
					"color": "#FFF"
				});
			}
		}	
	  }
	);
	$("#ideas").hover(
	  	function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		    		$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat center center",
						"color": "#161616"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat",
						"color": "#161616"
					});
				}
			}
		  }, function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		   			$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat center center",
						"color": "#FFF"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat",
						"color": "#FFF"
					});
				}
			}	
		  }
	);
	$("#wild").hover(
	  	function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		    		$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat center center",
						"color": "#161616"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat",
						"color": "#161616"
					});
				}
			}
		  }, function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		   			$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat center center",
						"color": "#FFF"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat",
						"color": "#FFF"
					});
				}
			}	
		  }
	);
	$("#survival").hover(
	  	function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		    		$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat center center",
						"color": "#161616"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_fill.png) no-repeat",
						"color": "#161616"
					});
				}
			}
		  }, function() {
			if (!$(this).hasClass("selected")) {
				if(w < 481 ){
		   			$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat center center",
						"color": "#FFF"
					});
				} else {
					$( this ).find(".como_menu_item_image").css({
						"background": "url(img/circle_stroke.png) no-repeat",
						"color": "#FFF"
					});
				}
			}	
		  }
	);
	$("#btn-top").hover(
	  	function() {
			if (!$(this).hasClass("selected")) {
				
					$( this ).css({
						"background": "url(img/bck_top_wild_over.png) no-repeat",
						"color": "#161616"
					});

			}
		  }, function() {
			if (!$(this).hasClass("selected")) {
				
					$( this ).css({
						"background": "url(img/bck-btn-top.png) no-repeat",
						"color": "#FFF"
					});
			}	
		  }
	);
	
	
	
	/* -------------  CATEGORIAS  --------------*/ 
	
	function get_cat_post(post){
		if(post){
			$.ajax({
				url: 'includes/_get_post_by_name.php',
				type: "POST",
				dataType: "json",
				data: "submit=&postSlug="+post,
				success: function(data){
					$("#post-date-cat").html(data.date + ' - <span class="cat-italic">'+data.category+'</span>');
					$("#post-title").html(data.title);
					$("#post-content").html(data.content);
					$("#blog_cr").css({
						"background": "url("+data.scr+") no-repeat center"
					});
				}
			 });
		}
	}
	
	/* -------------  CONTACTO  --------------*/ 
	function closeContacto(){
		$(".sp-content").removeClass("show-sp-content");
		$("#tx-home-1 span").removeClass("sp-top");
		$("#tx-home-2 span").removeClass("sp-top");
		$("#contacto-cont").fadeTo(900,0);
	}
	
	
	
	/* -------------  BLOG  --------------*/ 
	/*$("#post-date-cat").html('febrero 10, 2014 - <span class="cat-italic">innovación</span>');
	$("#post-title").html('Hands');
	$("#post-content").html('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies urna nisl, non rhoncus ipsum sagittis sit amet. Vestibulum vel sem eu massa tincidunt suscipit. Nam faucibus a eros aliquam tincidunt. Fusce et adipiscing enim, non mollis nunc. Fusce ornare augue non lacus ornare rhoncus.');
	$("#blog_cr").css({
		"background": "url(img/blog/post1_img.jpg) no-repeat center"
	});*/
	
	
	
			                
					               
//});
				
	



