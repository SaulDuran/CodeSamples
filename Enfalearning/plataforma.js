
$(document).ready(function() {
	/* ---- URL's
	perfil		-> 	about/:id/
	salir 		-> 	logout/
	curso 		->	courses/1/
	usuarios	->	courses/1/users

	----- URL's API
	lista modulos			->	/api/v1/courses/:course_id/modules
	lista modulos items		->	/api/v1/courses/:course_id/modules/:module_id/items
	*/
	/* --- FUNCIONES DE AYUDA --- */
	function salir(){
		document.getElementById("identity-logout-form").submit(); 
		return false;
	}
	function hasAnyRole(/*roles, cb*/) {
		var roles = [].slice.call(arguments, 0);
		var cb = roles.pop();
		for (var i = 0; i < arguments.length; i++) {
			if (ENV.current_user_roles.indexOf(arguments[i]) !== -1) {
				return cb(true);
			}
		}
		return cb(false);
	}
	function isUser(id, cb) {
		cb(ENV.current_user_id == id);
	}
	//REGISTRO
	function addUser(data){
		console.log("add user");
		var nameUsr = $( "#student_name").val();
		var terms = 0;
		if($( "#user_terms:checked" ).length){
			var terms = 1;
		} 
		var idUser = $( "#student_username").val();
		$.ajax( {
	        url: '/api/v1/accounts/1/users',
	        type: 'POST',
	        data : {
	        	'user': {
	        		'name' : nameUsr, 
	            	'short_name' : nameUsr,
	            	'terms_of_use' : terms
	        	},
	        	'pseudonym' : {
	        		'unique_id': idUser,
	            	'force_self_registration' : 1
	        	}
	        },
	        beforeSend : function( xhr ) {
	            xhr.setRequestHeader( 'Authorization', 'BEARER CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v');
	        },
	        success: function( response ) {
	            //ADD USER TO COURSE
	            $('.registration-dialog').hide();
		  		$('.registro-btn').show();
		  		$('#login_form').show();
		  		$('#linea1').show();
		  		$('#messageOkReg').show();
	            console.log(response)
	        },
	        error : function(error) {
	        	$('#messageErrReg').show();
	        	$("#messageErrReg").css("display", "block");
	            console.log("Error User-->",error.readyState);
	        }
	    });
		
	}
	//USER TO COURSE
	function addUserCourse(idUsr){
		console.log("add user Course"); 
		$.ajax( {
	        url: '/api/v1/courses/1/enrollments?access_token=CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v',
	        type: 'POST',
	        data : {
	        	'enrollment': {
	        		'user_id' : idUsr, 
	            	'enrollment_state' : "active",
	        	}
	        },
	        beforeSend : function( xhr ) {
	            xhr.setRequestHeader( 'Authorization', 'BEARER CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v');
	        },
	        success: function( response ) {
	            //ADD USER TO COURSE
	            location.pathname = "/";
	        },
	        error : function(error) {
	            console.log("Error Course-->",error);
	        }
	    });
	}
	//ADD USER PROFILE
	function addUserProfile(){
		console.log("ADD USER PROFILE");
		var usrCedula = $( "#profile_cedula").val();
		var usrMovil = $( "#profile_movil").val();
		var usrSucursal = $( "#profile_sucursal").val();
		var userColonia = $( "#profile_colonia").val();
		var userAntiguedad = $( "#profile_antiguedad").val(); 
		$.ajax( {
	        url: '/api/v1/users/'+ENV.current_user_id+'/custom_data/perfil/?access_token=CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v',
	        type: 'PUT',
	        data : {
	        	"ns": "com.enfalearning",
	        	"data": {
	        		'user_cedula' : usrCedula,
	        		'user_movil' : usrMovil,
	        		'user_sucursal' : usrSucursal,
	        		'user_colonia' : userColonia,
	        		'user_atiguedad' : userAntiguedad,
	        	}
	        },
	        beforeSend : function( xhr ) {
	            xhr.setRequestHeader( 'Authorization', 'BEARER CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v');
	        },
	        success: function( response ) {
	            addUserCourse(ENV.current_user_id)
	        },
	        error : function(error) {
	            console.log(error);
	        }
	    });
	}

	//VARS
	var wpath = location.pathname;
	var wapi = "/api/v1/";
	var rdata;

	//VARS ---> HTML 
	var avatarimg = '';
	
	if (wpath != "/login/canvas" && wpath.indexOf("/register/")  < 0) {
		if (ENV.current_user.avatar_image_url.match(/secure.gravatar.com/) || ENV.current_user.avatar_image_url.match(/qa.enfalearning.com/) ) {
			avatarimg = '/images/messages/avatar-50.png?ssl=1';
		} else {
			avatarimg = ENV.current_user.avatar_image_url
		}
	} else {
		
	}

	var btnlogout = '<a id ="btnexit" class="link-edit-profile" onclick="document.getElementById(&quot;identity-logout-form&quot;).submit(); return false;" href="/logout"><i class="md md-highlight-remove"></i><span>Salir</span></a>';
	var wnavhome = '<nav class="navbar navbar-default navbar-fixed-top"><div class="container-fluid" id="top-nav-bar"><div class="navbar-header pull-left"><button type="button" class="navbar-toggle pull-left m-15" data-activates=".sidebar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button><div class="brand-home"> <div class="logo-home"><img src="/enfalearning/img/logo-enfabebe.png" class="img-responsive"></div></div><ul class="breadcrumb"><li><h1 class="tittle-curso enfa-blue-1">Curso online sobre Nutrición Infantil</h1></li></ul></div><ul class="nav navbar-nav navbar-right menu-on-top navbar-right-no-collapse"><li id="step5"><a href="/conversations#filter=type=inbox"><i class="material-icons f28">&#xE8AF;</i></a><a href="/conversations#filter=type=inbox">Contacta al experto</a></li><li class="division-navbar">  | </li><li><a href="/courses/1/pages/faqs"><i class="material-icons f28">&#xE887;</i></a><a href="/courses/1/pages/faqs">Faqs</a></li><li class="division-navbar">  | </li><li><a class="btn-guia"><i class="material-icons f28">&#xE88E;</i></a><a class="btn-guia">Guia de usuario</a></li><li class="division-navbar">  | </li><li class="dropdown"><button id="btn-submenu" class="dropdown-toggle pointer btn btn-round-sm btn-link withoutripple" data-toggle="dropdown"><div class="avatar_small" style="background-image: url('+avatarimg+');"></div></button><ul id="menu-profile" class="dropdown-menu dropdown-menu-right theme-picker" role="menu"> <div class="container-fluid m-v-15"> <div class="pull-right"> <button type="button" class="close" id="btn-close">×</button> </div><h4 class="no-margin p-t-5">'+ENV.current_user.display_name+'</h4> <div class="row m-t-10 menu-edit-profile"> <div class="col-sm-12"> <a href="/about/'+ENV.current_user_id+'" class="link-edit-profile" data-target="#Modal-User"> <i class="md md-settings"></i> <span>Editar Perfil</span> </a> </div><div class="col-sm-12"> '+btnlogout+' </div></div></div></ul></li></ul></div></nav>';
	var wnavadmin = '<div class="admin-container" style="position:fixed; width: 100%; z-index: 100; margin-top: 63px; display: block; right: 0; left: 0; padding: 0 15px; background-color: #f2f2f2;"><ul class="menu-navbar-home"><li>Administración:&nbsp;&nbsp;&nbsp;</li><li><a class="enfa-red link-menu-home" href="/courses/1/">Módulos</a></li><li class="division-navbar">  | </li><li><a class="enfa-red link-menu-home" href="/courses/1/users">Usuarios</a></li><li class="division-navbar">  | </li><li><a class="enfa-red link-menu-home" href="#">Materiales</a></li><li class="division-navbar">  | </li><li><a class="enfa-red link-menu-home" href="/courses/1/pages">Páginas</a></li></ul></div>';
	var wpreloader = '<div id="preloader"><div id="status">&nbsp;</div></div>'
	var wfooter = '<footer class="main-litle-footer"><div class="main-footer-content"><div class="col-xs-5 col-sm-2"><img src="/enfalearning/img/log-farmacias.png" alt="" class="img-responsive"></div><div class="col-xs-7 col-sm-10"><ul class="footer-ul fr"><li>© 2015 Mead Johnson & Company. Todos los Derechos Reservados.</li><li>|</li><li><a href="http://www.enfabebe.com/es/aviso-de-privacidad" target="_blank">Aviso de Privacidad</a></li><li>|</li><li><a href="http://www.enfabebe.com/es/terminos-y-condiciones" target="_blank">Términos y Condiciones</a></li><li>|</li><li><a href="#" id="contacto-btn">Contacto</a></li></ul></div></div></footer>';

	//VIDEO CONDITION
	var shownextitem = false;
	var shownextitemcomplete = false;

	var styles = {display : "none"};
	//REMOVE CANVAS STUFF
	/*--- FOOTER ---*/
	$(".footer-logo").remove();
	$("span#footer-links").remove();
	

	//LOGIN
	var wlogincenterM = '<div class="control-group" id="messageOkReg" style="margin-top: 10px !important; display:none;"><span class="field-with-fancyplaceholder" style="color:#1f37c9; line-height:16px; text-align: center;">Gracias por registrarte. Te llegará un correo con las instrucciones para ingresar al curso y completar tus datos. Recuerda revisar la bandeja de correo no deseado (Spam)</span></div>';
	var wlogincenter = '<div class="center" id="loginc"><div class="login-container"><div class="login-header"><img src="/enfalearning/img/logo-enfabebe-transparent.png" alt="" class="img-responsive"></div><div class="login-content"><h1 class="login-title enfa-blue-1"><span>curso online</span><br>sobre nutrición infantil</h1><div id="linea1" class="sub-title-line enfa-blue-1-back"></div><div id="form_container">'+wlogincenterM+'</div></div><div class="division-login enfa-gold-back"></div><div id="panel-register" class="login-content"><h2 class="login-action-title enfa-blue-1">Inscripción</h2><div class="sub-title-line enfa-blue-1-back"></div><div class="registro-btn"><a href="/register" class="registro-btn-link">Regístrate</a></div></div></div></div>'
	var wlogin = '';

	if(wpath == '/login/canvas'){
		document.title = 'CURSO ONLINE SOBRE NUTRICIÓN INFANTIL';
		$("#application").css(styles);

		$("#pseudonym_session_unique_id").attr("placeholder", "Usuario");
		$("#pseudonym_session_password").attr("placeholder", "Contraseña");
		$("#pseudonym_session_unique_id_forgot").attr("placeholder", "Usuario");


		$('body').removeClass('modal').addClass('page-login');
		$('body').append(wlogincenter);
		
		$("#login_form").insertAfter('#form_container');
		$(".login-options").appendTo('#login_form');
		$("#forgot_password_form").insertAfter('#login_form');

		$("#login_forgot_password").text("¿Olvidaste tu contraseña?");
		$( "#btn-send-reg" ).click(function() {
			$('#messageErrReg').hide();
			$('#messageOkReg').hide();
		});
		//REGISTRO
		var wregistro1 = '<p id="forgot_password_instructions">Ingresa tu nombre completo y tu correo electrónico. Recibirás un correo con las instrucciones para ingresar al curso y completar tus datos.<br></p><div class="control-group"><span class="field-with-fancyplaceholder"><input type="text" id="student_name" name="user[name]" aria-required="true" placeholder="NOMBRE COMPLETO"></span></div>';
		var wregistro2 = '<div class="control-group"><span class="field-with-fancyplaceholder"><input type="text" id="student_username" name="pseudonym[unique_id]" aria-required="true" placeholder="USUARIO / EMAIL"></span></div>';
		var wregistro3 = '<div class="control-group"><label class="control-label" for="student_password">Contraseña</label><div class="controls"><input type="password" id="student_password" name="pseudonym[password]" aria-required="true"></div></div>';
		var wregistro4 = '<div class="control-group"><label class="control-label" for="student_password_confirmation">Confirmar la Contraseña</label><div class="controls"><input type="password" id="student_password_confirmation" name="pseudonym[password_confirmation]" aria-required="true"></div></div>';
		var wregistro50 = '<div class="control-group" id="messageErrReg" style="display:none;"><span class="field-with-fancyplaceholder" style="color:#cb4444; line-height:16px; text-align: center;">Este correo ya se utilizó anteriormente, intenta con un correo diferente.</span></div>';
		var wregistro5 = '<div class="control-group"><div class="controls"><label class="checkbox"><input id="user_terms" type="checkbox" name="user[terms_of_use]" value="1" aria-required="true">Acepta los <a href="http://www.enfabebe.com/es/terminos-y-condiciones" target="_blank">Términos y condiciones</a> y el <a href="http://www.enfabebe.com/es/aviso-de-privacidad" target="_blank">Aviso de privacidad</a>.</label></div></div>';
		var wregistro6 = '<div class="control-group"><div class="controls"><button class="btn btn-primary" style="position: absolute; left: -9999px;">Comenzar a aprender</button></div></div>';
		var wregistro7 = '<button id="btn-send-reg" class="btn btn-primary" type="submit">Enviar</button><div>← <a href="#" id="back_reg" class="login_link">Regresar al Inicio de la Sesión</a></div>';
		var wregistro = '<div class="registration-dialog"><form id="registration_form" class="form_container" method="post" action="">'+wregistro1+wregistro2+wregistro50+wregistro5+wregistro7+'</form></div>';
		$('#panel-register').append(wregistro);
		$('.registration-dialog').addClass('hideclass');

		$( "#btn-send-reg" ).click(function() {
		  addUser();
		  return false
		});
		$( ".registro-btn-link" ).click(function() {
		  	$('.registration-dialog').show();
		 	$('#login_form').hide();
		 	$('.registro-btn').hide();
		 	$('#linea1').hide();
		 	$('#messageOkReg').hide();
		  	return false
		});
		$( "#back_reg" ).click(function() {
		  	$('.registration-dialog').hide();
		  	$('.registro-btn').show();
		  	$('#login_form').show();
		  	$('#linea1').show();
			$('#messageErrReg').hide();
			$('#messageOkReg').hide();
		  	return false
		});

		



	} else if (document.URL.indexOf("/register")>0){
		var wlogincenterreg = '<div class="center" id="loginc"><div class="login-container"><div class="login-header"><img src="/enfalearning/img/logo-enfabebe-transparent.png" alt="" class="img-responsive"></div><div class="login-content"><h1 class="login-title enfa-blue-1"><span>curso online</span><br>sobre nutrición infantil</h1><div id="linea1" class="sub-title-line enfa-blue-1-back"></div><div id="form_container"></div></div></div></div>'
		$('body').removeClass('modal').addClass('page-login');
		$('body').append(wlogincenterreg);

		$('#modal-box h2').addClass("enfa-blue-1");
		$('#modal-box').find("form").removeClass("form-horizontal").removeClass("bootstrap-form");
		$("#pseudonym_password").attr("placeholder", "Contraseña");
		$(".instructions").html("Para poder terminar la inscripción necesitamos que ingreses una contraseña.")
		$("#registration_confirmation_form").find(".control-label").remove();
		$('label[for="user_subscribe_to_emails"]').addClass("hideclass");
		$("#modal-box").insertAfter('#form_container');

		$(".control-group").each(function( index ) {
			$(this).attr( "id", "regtr"+index );
		});
		$('#regtr4').remove();


		console.log("REGISTRO")

	} else {
		//USER FIRST TIME ---> PERFIL
		if(wpath.length == 1){
			if(ENV.DASHBOARD_COURSES.length == 0){
				console.log("firt time")
				var wprofile1 = '<span class=" field-with-fancyplaceholder"><label for="profile_cedula" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span>Cédula Profesional</span></label><input class="text" id="profile_cedula" name="profile_cedula" size="30" type="text" placeholder="Cédula Profesional"></span>'
		        var wprofile2 = '<span class=" field-with-fancyplaceholder"><label for="profile_movil" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span>Móvil</span></label><input class="text" id="profile_movil" name="profile_movil" size="30" type="text" placeholder="Móvil"></span>'
		        var wprofile3 = '<span class=" field-with-fancyplaceholder"><label for="profile_sucursal" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span>Móvil</span></label><input class="text" id="profile_sucursal" name="profile_sucursal" size="30" type="text" placeholder="Sucursal"></span>'
		        var wprofile4 = '<span class=" field-with-fancyplaceholder"><label for="profile_colonia" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span>Móvil</span></label><input class="text" id="profile_colonia" name="profile_colonia" size="30" type="text" placeholder="Colonia"></span>'
		        var wprofile5 = '<span class=" field-with-fancyplaceholder"><label for="profile_antiguedad" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span>Móvil</span></label><input class="text" id="profile_antiguedad" name="profile_antiguedad" size="30" type="text" placeholder="Antigüedad"></span>'
		      	var wprofilebtn = '<div><input type="submit" style="position: absolute; height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1"><button id="btn_add_profile" style="width:100%" type="submit" class="btn btn-primary">Enviar</button></div>'
				var wprofile = '<form accept-charset="UTF-8" action="" id="profile_form" method="post" style="display: block;"><h2 class="login-action-title enfa-blue-1">Completa tu perfil</h2><div class="sub-title-line enfa-blue-1-back" style="margin: 0 auto 15px auto;"></div><div>'+wprofile1+wprofile2+wprofile3+wprofile4+wprofile5+'</div>'+wprofilebtn+'</form>';
				var wlogincenterreg = '<div class="center" id="loginc"><div class="login-container"><div class="login-header"><img src="//qa.enfalearning.com/img/logo-enfabebe-transparent.png" alt="" class="img-responsive"></div><div class="login-content"><h1 class="login-title enfa-blue-1"><span>curso online</span><br>sobre nutrición infantil</h1><div id="form_container"></div>'+wprofile+'</div></div></div>'
				$('body').removeClass('modal').addClass('page-login');
				$('body').append(wlogincenterreg);

				$( "#btn_add_profile" ).click(function() {
		  			addUserProfile();
					return false
				});
			}
		}

		//ADD SECTION / MENU
		//ADMIN ENFALEARNING
		isUser(5, function(isAdmin) {
			console.log("1")
			if (isAdmin) {

				console.log("esAdmin")
				$("#application").addClass('app_show');
				$("#preloader").delay(2500).fadeOut("slow");
				//STYLE
				$("#menu").remove();
				$(".inbox").remove();
				$(".settings-link").remove();
				$('#breadcrumbs').remove();
				//MENU
				$("#section-tabs-header").html("ADMINISTRACIÓN");
				$("#left-side").find("nav").remove();
				var wmenuleft = '<nav aria-label="context" role="navigation"><ul id="section-tabs"><li class="section"><a class="home" href="/courses/1">Inicio</a></li><li class="section"><a class="people" href="/courses/1/users">Perfiles / Usuarios</a></li><li class="section"><a class="pages" href="/courses/1/wiki">Páginas</a></li><li class="section"><a class="modules" href="/courses/1/modules">Módulos</a></li><li class="section"><a class="modules" href="/estadisticas/">Estadísticas</a></li></ul></nav>'
				$("#left-side").append(wmenuleft);
				//REDIRECT
				if(wpath.length == 1){
					location.pathname = "/courses/1";
				}

		  	} else {
		   	 	//STUDENT

		  	}
		});
		//USER ADMIN UI
		hasAnyRole('admin', function(hasRole) {
			console.log("2")
			if (hasRole) {
				$("#application").addClass('app_show');
				$("#preloader").delay(2500).fadeOut("slow");
				var wmneuadmin = '<div class="brand-home"> <div class="logo-home"><img src="/enfalearning/img/logo-enfabebe.png" class="img-responsive"></div></div>';
				$("#header").prepend(wmneuadmin);
		  	} else {
		    
		  	}
		});
		//STUDENT
		hasAnyRole('student', function(hasRole) {
			
			if (hasRole) {
				$("#application").css(styles);
				//PRELOADER
				$('body').append(wpreloader);
				$("#preloader").delay(2500).fadeOut("slow");

				var wulmenulinks = '<ul class="menu-links"><li class="enfa-blue-1-back" icon="md md-home"><a href="/"><i class="md md-home"></i>&nbsp;<span>Home</span></a></li><li class="enfa-blue-grad-back-2" icon="md md-gps-fixed"><a href="/courses/1/"><i class="md md-gps-fixed"></i>&nbsp;<span>Bienvenida</span></a></li><li class="enfa-blue-grad-back-3" icon="md md-info-outline"><a href="/courses/1/pages/informacion-general"><i class="md md-info-outline"></i>&nbsp;<span>Información General</span></a></li><li class="enfa-blue-grad-back-4" icon="md md-list"><a href="/courses/1/pages/temario"><i class="md md-list"></i>&nbsp;<span>Temario</span></a></li><li class="enfa-blue-2-back" id="wmodulos"><a href="/courses/1/assignments/3?module_item_id=24" class="waves-effect"><i class="md md-school"></i>&nbsp;Módulos</a></li></ul>'
				var wasidebar = '<aside class="sidebar fixed enfa-blue-2-back" style="width: 260px; left: 0px; ">'+wulmenulinks+'</aside>';

				var wmaincontent = '<div id="contenedorprincipal" class="main-content"><div id="right-bar-details" class="row no-margin inner-modulo-container"><div id="assignments-quizz" class="col-md-12 col-lg-8"></div><div class="col-md-12 col-lg-4 light-grey" id="right-bar-container"></div></div></div>';
				var wmaincontainer = '<main><div class="main-container">'+ wnavhome + wasidebar + wmaincontent+'</div></main>'+wfooter;
				
				// Menu home
				var wulmenulinkshome = '<ul class="menu-links"><li class="enfa-blue-1-back" icon="md md-home"><a href="/"><i class="md md-home"></i>&nbsp;<span>Home</span></a></li><li class="enfa-blue-grad-back-2" icon="md md-gps-fixed"><a href="/courses/1/"><i class="md md-gps-fixed"></i>&nbsp;<span>Bienvenida</span></a></li><li class="enfa-blue-grad-back-3" icon="md md-info-outline"><a href="/courses/1/pages/informacion-general"><i class="md md-info-outline"></i>&nbsp;<span>Información General</span></a></li><li class="enfa-blue-grad-back-4" icon="md md-list"><a href="/courses/1/pages/temario"><i class="md md-list"></i>&nbsp;<span>Temario</span></a></li><li class="enfa-blue-2-back"><a href="/courses/1/"><i class="md md-forward"></i>&nbsp;Iniciar Curso</a></li></ul>'
				var wasidebarhome = '<aside class="sidebar fixed enfa-blue-2-back" style="width: 260px; left: 0px; ">'+wulmenulinkshome+'</aside>';
				//Add Menu Home
				var wmaincontainerhome = '<main><div class="main-container">'+ wnavhome + wasidebarhome + wmaincontent+'</div></main>'+wfooter;
				
				//STYLES
			  	//--- PAGES ---> HOME
			    if(wpath.length == 1){
			    	var wsecnav = '<main><div class="main-container home">'+ wnavhome + wasidebarhome + wmaincontent+'</div></main>';
					
					$('body').append(wsecnav);
					$.getJSON(wapi + "courses/1/pages/home", function(data){
						$('.home').append(data.body);
						$('#right-bar-details').remove();
						$('#home-contenido').appendTo('#contenedorprincipal');
						setTimeout(function(){ $('#home-contenido').appendTo('#contenedorprincipal'); }, 2000);
						console.log("pre-index")
						$('#myCarousel').attr("data-ride", "carousel");
						$('#myCarousel').find(".right").attr("data-slide", "next");
						$('#myCarousel').find(".left").attr("data-slide", "prev");
						
					});
					//ADD MENU ACTIVE
					$(".enfa-blue-1-back").prepend('<div class="menu-active"></div>');
				}

				//--- PAGES ---> MODULOS
				if(wpath.length > 1){
					
					$('body').append(wmaincontainer);
					//GET MODULES
					$.getJSON("/api/v1/courses/1/modules?include=items", function(data){
						$("#wmodulos").append('<ul id="Modulos" class=""></ul>');
						$.each(data, function( index, value ) {
							var wmli = '<li class="modulo-section" id="modulo-'+value.id+'"><ul><li class="titulo-modulo"><h3>'+value.name+'</h3></li></ul></li>'
							$("#Modulos").append(wmli);
							$.each(value.items, function( index, val ) {
								switch(val.type) {
									case "SubHeader":
										shid = val.id;
										var wcmodheader = '<li class="content-modulo"><div class="progreso-modulo"><span id="mI-'+shid+'" class="indicador-progreso progreso-100"></span></div><div class="info-tema-modulo" id="info-tema-modulo-'+val.id+'"><div class="titulo-tema">'+val.title+'</div></div></li>';
										$("#modulo-"+val.module_id).find("ul").append(wcmodheader);
									break;
									case "Page":
									   	shid = val.id;
										var wcmodheader = '<li class="content-modulo"><div class="progreso-modulo"><span id="mI-'+shid+'" class="indicador-progreso progreso-100"></span></div><div class="info-tema-modulo" id="info-tema-modulo-'+val.id+'"><div class="titulo-tema">'+val.title+'</div></div></li>';
										$("#modulo-"+val.module_id).find("ul").append(wcmodheader);
									break;
									case "Assignment":
									    if(val.completion_requirement.completed){
											var wcomp = (val.completion_requirement.completed) ? "tema-complete" : "tema";
									    	var wcmoditem = '<a id="modulo-'+val.id+'" href="'+val.html_url+'"><div><span class="indicador-tema-complete"></span>'+val.title+'</div></a>';
									    	shownextitemcomplete = true;
										} else {
											if(val.id == 24){
									    		var wcomp = (val.completion_requirement.completed) ? "tema-complete" : "tema";
									    		var wcmoditem = '<a href="'+val.html_url+'"><div><span class="indicador-tema-complete"></span>'+val.title+'</div></a>';
									    		shownextitemcomplete = true;
									    	} else {
									    		var wcmoditem = '<div><span class="indicador-tema"></span>'+val.title+'<i class="md md-lock"></i></div>';
												shownextitemcomplete = false;
									    	}
											
										}
										$("#info-tema-modulo-"+shid).append(wcmoditem);
									break; 
									case "Quiz":
									    if(val.completion_requirement.completed){
											var wcomp = (val.completion_requirement.completed) ? "tema-complete" : "tema";
									    	var wcmoditem = '<a id="modulo-'+val.id+'" href="'+val.html_url+'"><div><span class="indicador-tema-complete"></span>'+val.title+'</div></a>';
									    	shownextitemcomplete = true;
										} else {
											var wcmoditem = '<div><span class="indicador-tema"></span>'+val.title+'<i class="md md-lock"></i></div>';
											shownextitemcomplete = false;
										}
										$("#info-tema-modulo-"+shid).append(wcmoditem);
									break;    
								}
								//MODULO ACTIVO
							    var wmod=location.search.substring(1).split('=');
							    if(wmod){
							    	$("#modulo-"+wmod[1]).addClass("active");
							    }
							    //INDICADORES
							    var iC = $( "#info-tema-modulo-"+shid+" a" ).length;
							    var iU = $( "#info-tema-modulo-"+shid+" div" ).length - 1;
							    var iT = (iC / iU) * 100;
							    $("#mI-"+shid).css("width", iT+"%");

							});
						});
						
					});
				}
				//BIENVENIDA
				if(wpath == "/courses/1/" || wpath == "/courses/1"){
					console.log("CURSOS BIENVENIDA")
					var btncoorale = '<button type="button" class="btn btn-default btn-flat" data-toggle="collapse" data-target="#expand-coord-1">Ver más</button>';
					var btncoormart = '<button type="button" class="btn btn-default btn-flat" data-toggle="collapse" data-target="#expand-coord-2">Ver más</button>';
					var btncoorjose = '<button type="button" class="btn btn-default btn-flat" data-toggle="collapse" data-target="#expand-coord-3">Ver más</button>';
					$('.coordinador-1').append(btncoorale);
					$('.coordinador-2').append(btncoormart);
					$('.coordinador-3').append(btncoorjose);
					$('#right-bar-details').remove();
					$('#bienvenida').appendTo('#contenedorprincipal');
					setTimeout(function(){ $('#bienvenida').appendTo('#contenedorprincipal'); }, 2000);
					//ADD MENU ACTIVE
					$(".enfa-blue-grad-back-2").prepend('<div class="menu-active"></div>');
				}
				//INFORMACIÓN GENERAL
				if(wpath == "/courses/1/pages/informacion-general" || wpath == "/courses/1/pages/informacion-general/"){
					console.log("INFORMACION")
					$('#right-bar-details').remove();
					setTimeout(function(){ $('#info-general').appendTo('#contenedorprincipal'); }, 2000);
					//ADD MENU ACTIVE
					$(".enfa-blue-grad-back-3").prepend('<div class="menu-active"></div>');
				}

				//TEMARIO
				if(wpath == "/courses/1/pages/temario" || wpath == "/courses/1/pages/temario/"){
					$('#right-bar-details').remove();
					$('#temario-container').appendTo('#contenedorprincipal');
					setTimeout(function(){ $('#temario-container').appendTo('#contenedorprincipal'); }, 2000);
					//ADD MENU ACTIVE
					$(".enfa-blue-grad-back-4").prepend('<div class="menu-active"></div>');
				}

				// ------------ AQUI VAN LAS OTRAS PAGINAS (FAQS... ETC) ------- //
				//FAQS
				if(wpath == "/courses/1/pages/faqs" || wpath == "/courses/1/pages/faqs/"){
					$('#right-bar-details').remove();
					$('#faqs-container').appendTo('#contenedorprincipal');
					setTimeout(function(){ $('#faqs-container').appendTo('#contenedorprincipal'); }, 2000);
				}

				

				
				//ASSIGMENTS
				if (wpath.indexOf("/assignments")>0 || wpath.indexOf("/assignments/")>0) {
			    	$("#breadcrumbs").css(styles);
			    	$("ul.student-assignment-overview").css(styles);
			    	$(".title-content").find("h1").addClass('inner-modulo-title col-sm-12 enfa-blue-2');
					
					$("#content-wrapper").appendTo('#assignments-quizz');
					//WEBM / OGG
					$('#pdesc0').remove();
					var videoSrc = $('#wvidcontainer').html();
					$('#wvidcontainer').html('');
					$('#wvidcontainer').append('<video controls><source src="'+videoSrc+'.mp4" type="video/mp4"><source src="'+videoSrc+'.webm" type="video/webm"><source src="'+videoSrc+'.ogv" type="video/ogg"></video>');
				    //RIGHT BAR
				    //body
				    var rbartabpane = '<div class="tab-content m-t-10"><div role="tabpanel" class="tab-pane active" id="tab-log"></div><div role="tabpanel" class="tab-pane" id="tab-timeline"></div><div role="tabpanel" class="tab-pane" id="tab-messages"></div></div>'
				    var rbartabs = '<div id="material-apoyo"><div role="tabpanel"><ul class="nav nav-tabs" role="tablist"><li id="li-lectura-sugerida" role="presentation" class="col-xs-6 active"><a id="lectura-sugerida-btn" aria-controls="home" role="tab" data-toggle="tab" href="#">Lectura<br>sugerida</a></li><li id="li-material-de-apoyo" role="presentation" class="col-xs-6"><a id="material-de-apoyo-btn" aria-controls="home" role="tab" data-toggle="tab" href="#">Material<br>de apoyo</a></li></ul>'+rbartabpane+'</div></div>';
				    var rbarurl = $(".description").find("a").attr("href");
				    $(".description").find("a").hide();
				    $.getJSON(wapi + rbarurl, function(datapage){
				    	$("#right-bar-container").append(datapage.body+rbartabs)
				    	$("#lectures").appendTo("#tab-log");
				    	$("#wmat-apoyo").appendTo("#tab-timeline");

				    	//CHANGE PANELs
				    	$( "#material-de-apoyo-btn" ).click(function() {
				    		$('#tab-log').removeClass("active");
				    		$('#tab-timeline').addClass("active");

				    		$('#li-lectura-sugerida').removeClass("active");
				    		$('#li-material-de-apoyo').addClass("active");
				    		
				    		return false;
				    	})

				    	$( "#lectura-sugerida-btn" ).click(function() {
				    		$('#tab-log').addClass("active");
				    		$('#tab-timeline').removeClass("active");

				    		$('#li-lectura-sugerida').addClass("active");
				    		$('#li-material-de-apoyo').removeClass("active");
				    		
				    		return false;
				    	})

				    });
				    //ADD MENU ACTIVE
					$(".enfa-blue-2-back").prepend('<div class="menu-active"></div>');
				    $(".description p").each(function( index ) {
					  $(this).attr( "id", "pdesc"+index );
					  if(index>0){
					  	$(this).remove()
					  }
					});

				}

				//EVALUACIONES
				if (wpath.indexOf("/quizzes")>0 || wpath.indexOf("/quizzes/")>0) {
					$("#breadcrumbs").css(styles);
			    	$("ul.student-assignment-overview").css(styles);
			    	$(".quiz-header").find("h1").addClass('inner-modulo-title col-sm-12 enfa-blue-2');
					$("#content-wrapper").appendTo('#assignments-quizz');

					//TIME
					$("#quiz-time-elapsed").appendTo('.quiz-header');
					
					//RIGHT BAR
				    //body
				    var rbartabpane = '<div class="tab-content m-t-10"><div role="tabpanel" class="tab-pane active" id="tab-log"></div><div role="tabpanel" class="tab-pane" id="tab-timeline"></div><div role="tabpanel" class="tab-pane" id="tab-messages"></div></div>'
				    var rbartabs = '<div id="material-apoyo"><div role="tabpanel"><ul class="nav nav-tabs" role="tablist"><li id="li-lectura-sugerida" role="presentation" class="col-xs-6 active"><a id="lectura-sugerida-btn" aria-controls="home" role="tab" data-toggle="tab" href="#tab-log">Lectura<br>sugerida</a></li><li id="li-material-de-apoyo" role="presentation" class="col-xs-6"><a id="material-de-apoyo-btn" aria-controls="home" role="tab" data-toggle="tab" href="#tab-timeline">Material<br>de apoyo</a></li></ul>'+rbartabpane+'</div></div>';
				    var rbarurl = $(".description").find("a").attr("href");
				    $(".description").find("a").hide();
				    $.getJSON(wapi + rbarurl, function(datapage){
				    	$("#right-bar-container").append(datapage.body+rbartabs)
				    	$("#lectures").appendTo("#tab-log");
				    	$("#wmat-apoyo").appendTo("#tab-timeline");
				    	//tabs-paneles
				    	//CHANGE PANELs
				    	$( "#material-de-apoyo-btn" ).click(function() {
				    		$('#tab-log').removeClass("active");
				    		$('#tab-timeline').addClass("active");

				    		$('#li-lectura-sugerida').removeClass("active");
				    		$('#li-material-de-apoyo').addClass("active");
				    		
				    		return false;
				    	})

				    	$( "#lectura-sugerida-btn" ).click(function() {
				    		$('#tab-log').addClass("active");
				    		$('#tab-timeline').removeClass("active");

				    		$('#li-lectura-sugerida').addClass("active");
				    		$('#li-material-de-apoyo').removeClass("active");
				    		
				    		return false;
				    	})
				    });
				    //ADD MENU ACTIVE
					$(".enfa-blue-2-back").prepend('<div class="menu-active"></div>');
				}

				//CONVERSATIONS
				if (wpath=="/conversations" || wpath=="/conversations/") {
					console.log("conversations")
					$("#right-bar-details").remove();
					$("#contenedorprincipal").append('<div id="temario-container" class="section-temario"></div>')
					$("#content-wrapper").appendTo('#temario-container');
					setTimeout(function(){ $("#content-wrapper").appendTo('#temario-container'); }, 1000);

					$('.course-filter').remove();
				}

				//ABOUT
				if (document.URL.indexOf("/about")>0 || document.URL.indexOf("/about/")>0) {
					$("#breadcrumbs").css(styles);
					console.log("about")
					$("#right-bar-details").remove();
					$("#contenedorprincipal").append('<div id="temario-container" class="section-temario"></div>')
					$("#content-wrapper").appendTo('#temario-container');
					//setTimeout(function(){ $("#content-wrapper").appendTo('#temario-container'); }, 4000);

					//REMOVE DIVS
					$("#edit_profile_form div").each(function( index ) {
					  $(this).attr( "id", "pr"+index );
					});

					$('#pr5').remove();
					$('#pr8').remove();
					$('#pr6 p').remove();
					$('.show-if-editing').remove();
					var wprofileUsuerName = '<span id="edit-username-input" style="display:none !important;" class="field-with-fancyplaceholder"><input class="text" id="profile_name" name="profile_name" size="30" type="text" placeholder="'+ENV.current_user.display_name+'" value="'+ENV.current_user.display_name+'"></span>'
					$('#pr3').append(wprofileUsuerName);


					//PROFILE	
					var vcdu;
					var vmovil;
					var vsucursal;
					var vcolonia;
					var vanti;
					$.getJSON("/api/v1/users/"+ENV.current_user_id+"/custom_data/perfil/user_cedula/?ns=com.enfalearning", function(data){
						vcdu=data.data;
						$("#profile_cedula").val( vcdu );
					});	
					$.getJSON("/api/v1/users/"+ENV.current_user_id+"/custom_data/perfil/user_movil/?ns=com.enfalearning", function(data){
						vmovil=data.data;
						$("#profile_movil").val( vmovil );
					});	
					$.getJSON("/api/v1/users/"+ENV.current_user_id+"/custom_data/perfil/user_sucursal/?ns=com.enfalearning", function(data){
						vsucursal=data.data;
						$("#profile_sucursal").val( vsucursal );
					});	
					$.getJSON("/api/v1/users/"+ENV.current_user_id+"/custom_data/perfil/user_colonia/?ns=com.enfalearning", function(data){
						vcolonia=data.data;
						$("#profile_colonia").val( vcolonia );
					});	
					$.getJSON("/api/v1/users/"+ENV.current_user_id+"/custom_data/perfil/user_atiguedad/?ns=com.enfalearning", function(data){
						vanti=data.data;
						$("#profile_antiguedad").val( vanti );
					});	

					var wprofile1E = '<span class="field-with-fancyplaceholder"><label for="profile_cedula" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span style="display:block !important; text-transform: uppercase;">Cédula Profesional</span></label><input class="text" id="profile_cedula" name="profile_cedula" size="30" type="text" placeholder="Cédula Profesional" disabled></span>'
		        	var wprofile2E = '<span class="field-with-fancyplaceholder"><label for="profile_movil" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span style="display:block !important; text-transform: uppercase;">Móvil</span></label><input class="text" id="profile_movil" name="profile_movil" size="30" type="text" placeholder="Móvil" disabled></span>'
		        	var wprofile3E = '<span class="field-with-fancyplaceholder"><label for="profile_sucursal" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span style="display:block !important; text-transform: uppercase;">Sucursal</span></label><input class="text" id="profile_sucursal" name="profile_sucursal" size="30" type="text" placeholder="Sucursal" disabled></span>'
		        	var wprofile4E = '<span class="field-with-fancyplaceholder"><label for="profile_colonia" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span style="display:block !important; text-transform: uppercase;">Colonia</span></label><input class="text" id="profile_colonia" name="profile_colonia" size="30" type="text" placeholder="Colonia" disabled></span>'
		        	var wprofile5E = '<span class="field-with-fancyplaceholder"><label for="profile_antiguedad" class="placeholder" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; display: inline-block;"><span style="display:block !important; text-transform: uppercase;">Antigüedad</span></label><input class="text" id="profile_antiguedad" name="profile_antiguedad" size="30" type="text" placeholder="Antigüedad" disabled></span>'
		      		var wprofileEbtn = '<div id="editPro"><input type="submit" style="position: absolute; height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1"><button id="btn_edit_profile" style="width:100%" type="submit" class="btn btn-primary">Editar</button></div>'
					var wprofileSbtn = '<div id="savePro" style="display: none; "><input type="submit" style="position: absolute; height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1"><button id="btn_save_profile" style="width:100%" type="submit" class="btn btn-primary">Guardar</button></div>'

		      		$('#pr6').append(wprofile1E+wprofile2E+wprofile3E+wprofile4E+wprofile5E+wprofileEbtn+wprofileSbtn);
		      		//MOVE NOMBRE

		      		$("#pr3").prependTo("#pr1");
		      		$("#pr1").append('<div class="row-fluid">Edita tu imagen de perfil</div>');

		      		$( "#btn_edit_profile" ).click(function() {
			  			$('#editPro').hide();
			  			$('#savePro').show();
			  			$("#profile_cedula").removeAttr('disabled');
			  			$("#profile_movil").removeAttr('disabled');
			  			$("#profile_sucursal").removeAttr('disabled');
			  			$("#profile_colonia").removeAttr('disabled');
			  			$("#profile_antiguedad").removeAttr('disabled');
			  			//USERNAME
			  			$('#edit-username-input').addClass('field-with-fancyplaceholder');
			  			$('#edit-username-input').show();
			  			$('#profile_name').focus();

						return false
					});
					$( "#btn_save_profile" ).click(function() {
						var usrCedula = $( "#profile_cedula").val();
						var usrMovil = $( "#profile_movil").val();
						var usrSucursal = $( "#profile_sucursal").val();
						var userColonia = $( "#profile_colonia").val();
						var userAntiguedad = $( "#profile_antiguedad").val();
						$.ajax( {
					        url: '/api/v1/users/'+ENV.current_user_id+'/custom_data/perfil/?access_token=CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v',
					        type: 'PUT',
					        data : {
					        	"ns": "com.enfalearning",
					        	"data": {
					        		'user_cedula' : usrCedula,
					        		'user_movil' : usrMovil,
					        		'user_sucursal' : usrSucursal,
					        		'user_colonia' : userColonia,
					        		'user_atiguedad' : userAntiguedad,
					        	}
					        },
					        beforeSend : function( xhr ) {
					            xhr.setRequestHeader( 'Authorization', 'BEARER CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v');
					        },
					        success: function( response ) {
					            $("#profile_cedula").attr('disabled','disabled'); 
					            $("#profile_movil").attr('disabled','disabled'); 
					            $("#profile_sucursal").attr('disabled','disabled'); 
					            $("#profile_colonia").attr('disabled','disabled'); 
					            $("#profile_antiguedad").attr('disabled','disabled');
					            $('#editPro').show();
			  					$('#savePro').hide();

					        },
					        error : function(error) {
					            console.log(error);
					        }
					    });
						//USERNAME
						var usrName = $( "#profile_name").val();
						$.ajax( {
					        url: '/api/v1/users/'+ENV.current_user_id+'/?access_token=CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v',
					        type: 'PUT',
					        data : {
					        	"user[name]": usrName,
					        	"user[short_name]": usrName,
					        	"user[sortable_name]": usrName,
					        },
					        beforeSend : function( xhr ) {
					            xhr.setRequestHeader( 'Authorization', 'BEARER CXdPgFkNrF3HLIg2AKol0VSL7hArjgz8YhBONw7lSECoWikLPNDrpPAp6I163A6v');
					        },
					        success: function( response ) {
					        	$('#edit-username-input').removeClass('field-with-fancyplaceholder');
					            $('#edit-username-input').hide();
					            $('#pr3 h1').html(usrName);

					        },
					        error : function(error) {
					            console.log(error);
					        }
					    });
						return false
					});	
				}
				
		  	} else {
		    	
		  	}
		});
	}

	// SHOW SUBMENU PROFILE
	$("#btn-submenu").on( "click", function() {
		$("#menu-profile").fadeTo("fast", 1);
		$("#menu-profile .container-fluid").fadeTo("fast", 1);
	});
	$("#btn-close").on( "click", function() {
		$("#menu-profile .container-fluid").fadeTo("fast", 0);

		$("#menu-profile").fadeTo("fast", 0, function() {
	    	$(this).hide()
	  });
	});

	// CONTACTO
	var wcontacto_overlay = '<div id="overlay-contacto" class="ui-widget-overlay" style="width: 1680px; height: 1078px; z-index: 1001;"></div>';
	var wcontacto_dialog = '<div id="dialog-contacto" class="ui-dialog ui-widget-content ui-corner-all" tabindex="-1" style="outline: 0px; z-index: 1002; position: absolute; left: 0;right: 0;margin: 0 auto;height: auto; width: 700px; top: 10%; display: block;" aria-hidden="false"><div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span id="ui-id-1" class="ui-dialog-title" role="heading">&nbsp;</span><a href="#" class="ui-dialog-titlebar-close ui-corner-all contacto-cerrar" role="button" tabindex="0"><i class="icon-x"></i><span class="screenreader-only">cerrar</span></a></div><div id="compose-new-message" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0" style="width: auto; min-height: 0px; height: 315px;"><div class="message-body" style="height: 250px; text-align:center;"><div class="row sub-title-imc enfa-blue-1" style="">Contacto</div><div style="width:140px; margin:0 auto;"><img src="/enfalearning/img/logo_imc.png" alt="" class="img-responsive"></div><h3><a href="mailto:contacto@imc.org.mx">contacto@imc.org.mx</a></h3></div></div><div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"><div class="ui-dialog-buttonset"><button type="button" class="contacto-cerrar ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only " role="button" aria-disabled="false"><span class="ui-button-text">Cerrar</span></button></div></div></div>';
	$("#contacto-btn").click(function(event) {
		$('body').append(wcontacto_overlay);
		$('body').append(wcontacto_dialog);
		$(".contacto-cerrar").click(function(event) {
			$('#overlay-contacto').remove();
			$('#dialog-contacto').remove();
			event.preventDefault();
		});


		event.preventDefault();
	});
	
	// GUIA DE USUARIO
	var wguia = '<div class="guia-container"><a class="guia-close"><span class="md md-close"></span></a><a href="#" class="guia-next"><span class="md md-keyboard-arrow-right"></span></a><a href="#" class="guia-prev"><span class="md md-keyboard-arrow-left"></span></a><div id="guia-slider"><ul><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-1.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-2.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-3.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-4.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-5.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-6.jpg" alt="Guía de Usuario"></li><li><img class="img-responsive" src="/enfalearning/img/guia/guia-usuario-7.jpg" alt="Guía de Usuario"></li></ul></div></div>';
	$('body').append(wguia);
	var slideCount = $('#guia-slider ul li').length;
	var slideWidth = $('#guia-slider ul li').width();
	var slideHeight = $('#guia-slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#guia-slider').css({ width: slideWidth});
	$('#guia-slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	$('#guia-slider ul li:last-child').prependTo('#guia-slider ul');
	//RESIZE
	$( window ).resize(function() {
	  var slideCount = $('#guia-slider ul li').length;
		var slideWidth = $('#guia-slider ul li').width();
		var slideHeight = $('#guia-slider ul li').height();
		var sliderUlWidth = slideCount * slideWidth;

		$('#guia-slider').css({ width: slideWidth});
		$('#guia-slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
		$('#guia-slider ul li:last-child').prependTo('#guia-slider ul');
	});

	function moveLeft() {
        $('#guia-slider ul').animate({
            left: + slideWidth
        }, 600, function () {
            $('#guia-slider ul li:last-child').prependTo('#guia-slider ul');
            $('#guia-slider ul').css('left', '');
        });
    };
    function moveRight() {
        $('#guia-slider ul').animate({
            left: - slideWidth
        }, 600, function () {
            $('#guia-slider ul li:first-child').appendTo('#guia-slider ul');
            $('#guia-slider ul').css('left', '');
        });
    };

    $('a.guia-prev').click(function () {
        moveLeft();
    });

    $('a.guia-next').click(function () {
        moveRight();
    });

    $('a.guia-close').click(function () {
        $('.guia-container').fadeTo("fast", 0, function() {
	    	$('.guia-container').hide()
	  	});
    });


	$(".btn-guia").click(function(event) {
		$(".guia-container").fadeTo(300, 1);
		console.log("GUIA")
		event.preventDefault();
	});


	// LOAD APP Script
	$.getScript("/enfalearning/js/app.js").done( function( ) {
		console.log("app script loaded");
	});

	
	
	

	/***********************************************
	 ** Add Google Analytics
	 ***********************************************/
	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-66447202-1', 'auto');
	ga('send', 'pageview');

	//BANNERS
	setTimeout(function(){
		$("#banner-clic").click(function(event) {
			ga('send', 'event', 'button', 'click', 'BannerEnfagrow');
			console.log("GA")
		});
		$(".noticias-img").click(function(event) {
			ga('send', 'event', 'button', 'click', 'NoticiasImg');
			console.log("GA")
		});
		$(".btn-enfabe-litle").click(function(event) {
			ga('send', 'event', 'button', 'click', 'NoticiasVerMas');
			console.log("GA")
		});
	}, 5000);
	
	


//END READY	
});


