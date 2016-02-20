jQuery( document ).ready( function( $ ) {
	
  var w = $(window).width();
  var h = $(window).height();
  var s = 55;
  var gridster;
  var nC;
  var mcp = 0;

  $(window).load(function() {

    $('.grid-loader-container').fadeTo(400,0, function() {
      $(this).hide();
    });
    if( h > 768){
      s = 55;
    } else {
      s = 55;
    }
    $('.col-fechas-n').css("width", s);
  })

  //PROYECTOS
  //CLICK BOTÓN
  $('.filtros_link').click(function(){

    var orderBy,
        order,
        type;

    orderBy = $(this).data("orderby");
    order   = $(this).data("order");
    type    = $(this).data("type");
    
    //CALL Function
    $('.filtros_link').removeClass('filtros_active')
    getProyectos(orderBy, order, type);
    $(this).addClass('filtros_active');

    //Loader
    $('.grid-loader-container').fadeTo(500,1);

    $( "#grid-container-mov" ).animate({
      left: 0,
    }, 300, function() {});

  })
  //FUNCION PARA OBTENER DATOS
  function getProyectos(orderByG, orderG, typeG){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://3amasc.com/get-projects/",
      data: { orderBy: orderByG, order: orderG, type: typeG },
      timeout: 6000,
      error: function(request,error) {
       
      },
      success: function(data) {
        console.log("init");
        var nR = 0;
        $.each(data.newRows, function(key, val) {
          gridster.mutate_widget_in_gridmap($('#th-'+data.newIds[key]), { col: $('#th-'+data.newIds[key]).data("col"), row: $('#th-'+data.newIds[key]).data("row")}, { col: data.newCols[key], row: data.newRows[key]});
          //CHANGE URL
          $('#th-'+data.newIds[key]).find("a").attr("href", data.links[key]+'?f='+data.typeFilter);
          nR++;
        });
        gridster.init();
        //UPDATE TITLe
       nC = 0;
        $('.bar-title-columns-c').fadeTo(100, 0, function() {
          $(this).html('')
          //if(typeG == "programa"){
            $(this).append('<table style="width:100%" class="tab-c"><tr></tr></table>')
          //}
          $.each(data.hCol, function(key, val) {
            if(typeG == "programa"){
              var colSpan = 1;
              if(data.hCol[key][0]){
                  colSpan = 1;
                  $('.bar-title-columns-c').find('.tab-c tr').append('<td colspan="1">'+data.hCol[key][0]+'</td>');
                  console.log($('[data-col="2"]').offset().left);
               } else {
                  colSpan++;
                  $('.bar-title-columns-c').find('.tab-c td').attr( "colspan", colSpan);
                  //colSpan = 1;
               }
             
            } else {
              $('.bar-title-columns-c').append('<div class="col-fechas-n">'+data.hCol[key]+'</div>');
              $('.bar-title-notes').html('&nbsp;')
            }
            nC++;
          });
          console.log("Col", nC)
          $(this).fadeTo(100, 1);
          $('.bar-title-columns').css("width", nC * (s+4)).fadeTo(100, 1);
          $('.col-fechas-n').css("width", s);
          /////////////////////
          //BTN ARROW PROYECTOS
          /////////////////////
          if(nC>16){
            $('.grid-container').css("width", '944px');
            $('#grid-container-mov').css("position", 'absolute');
            //
            $('.arrow-proyectos').show();
            mcp = 0;
          } else {
            $('#grid-container-mov').css("position", 'relative');
            $('.grid-container').css("width", '100%');
            $('.arrow-proyectos').hide();
          }
          //////////////
        });
        //LOADER
        $('.grid-loader-container').fadeTo(400,0, function() {
          $(this).hide();
        });
      }
    });
  }

  function getProyectosInit(orderByG, orderG, typeG){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://3amasc.com/get-projects/",
      data: { orderBy: orderByG, order: orderG, type: typeG },
      timeout: 6000,
      error: function(request,error) {
       
      },
      success: function(data) {
        console.log(h)
        //
        if( h > 768){
          s = 55;
        } else {
          s = 55;
        }
        //
        var nR = 0;
        $.each(data.newRows, function(key, val) {
          var html = '<li data-row="'+data.newRows[key]+'" data-col="'+data.newCols[key]+'" data-sizex="1" data-sizey="1" class="gs-w" id="th-'+data.newIds[key]+'">';
              html += '<a href="'+data.links[key]+'?f='+data.typeFilter+'">';
              html += '<div class="th-proyecto" style="position:relative; width:100%; height: 100%; background: url('+data.ths[key]+') no-repeat center; background-size: 144px 144px;">';
              html += '<div class="th-title-proyecto"><div>'+data.titles[key]+'</div><div class="th-title-mas-proyecto">+</div></div></div>';
              html += '</a>';
              html += '</li>';
          $('.ul-gridster').append(html);
          nR++;
        });
        $(function(){
          gridster = $(".gridster ul").gridster({
            widget_base_dimensions: [s, s],
            widget_margins: [2, 2],
            helper: 'clone',
            avoid_overlapped_widgets: true
          }).data('gridster').disable();
          // resize widgets on hover
          gridster.$el
            .on('mouseenter', '> li', function() {
              gridster.resize_widget($(this), 2, 2);
              $(this).find('.th-title-proyecto').fadeTo(200, 1);
            })
            .on('mouseleave', '> li', function() {
              gridster.resize_widget($(this), 1, 1);
              $(this).find('.th-title-proyecto').fadeTo(200, 0);
            });
        });
        console.log("INIT")
        //gridster.init();
        //UPDATE TITLe
        nC = 0;
        $('.bar-title-columns-c').fadeTo(100, 0, function() {
          $(this).html('')
          //if(typeG == "programa"){
            $(this).append('<table style="width:100%" class="tab-c"><tr></tr></table>')
          //}
          $.each(data.hCol, function(key, val) {
            if(typeG == "programa"){
              var colSpan = 1;
              if(data.hCol[key][0]){
                  colSpan = 1;
                  $('.bar-title-columns-c').find('.tab-c tr').append('<td colspan="1">'+data.hCol[key][0]+'</td>');
               } else {
                  colSpan++;
                  $('.bar-title-columns-c').find('.tab-c td').attr( "colspan", colSpan);
                  //colSpan = 1;
               }
             
            } else {
              var colSpan = 1;
              console.log("INIT--->", data.hCol[key])
              if(data.hCol[key]){
                colSpan = 1;
                $('.bar-title-columns-c').find('.tab-c tr').append('<td style="font-size: 14px;" colspan="'+colSpan+'">'+data.hCol[key]+'</td>');
              } else {
                colSpan++;
                $('.bar-title-columns-c').find('.tab-c td').attr( "colspan", colSpan);
              }
              
              /*$('.bar-title-columns-c').append('<div class="col-fechas-n">'+data.hCol[key]+'</div>');
              $('.bar-title-notes').html('&nbsp;')*/
            }
            nC++;
          });
          $(this).fadeTo(100, 1);
          $('.bar-title-columns').css("width", nC * (s+4)).fadeTo(100, 1);
          $('.col-fechas-n').css("width", s);
          /////////////////////
          //BTN ARROW PROYECTOS
          /////////////////////
          if(nC>16){
            $('.grid-container').css("width", '944px');
            $('#grid-container-mov').css("position", 'absolute');
            //
            $('.arrow-proyectos').show();
            console.log(nC)
            mcp = 0;
          } else {
            $('#grid-container-mov').css("position", 'relative');
            $('.grid-container').css("width", '100%');
            $('.arrow-proyectos').hide();
          }
          //////////////

        });
        //LOADER
        /*$('.grid-loader-container').fadeTo(400,0, function() {
          $(this).hide();
        });*/
      }
    });
  }

  getProyectosInit("date", "DESC", "crono");
  //MENU
  console.log($(location).attr('href'))

	$('#spnTop').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

  $('.effect-3ac').on("touchstart", function (e) {
    'use strict';
    var link = $(this);
    if (link.hasClass('efecto-over')) {
        return true;
    } else {
        link.addClass('efecto-over');
        $('.effect-3ac').not(this).removeClass('efecto-over');
        e.preventDefault();
        return false; 
    }
  });
  
  $( "#arrow_r" ).click(function(event) {
    var numC = nC - 14;
    console.log(numC)
    if(mcp < numC){
      $( "#grid-container-mov" ).animate({
        left: "-="+(s+4),
      }, 300, function() {
        // Animation complete.
      });
      mcp++;
    }
    return false;
  });
  $( "#arrow_l" ).click(function(event) {
    if(mcp>0){
      $( "#grid-container-mov" ).animate({
        left: "+="+(s+4),
      }, 300, function() {
        // Animation complete.
      });
      mcp--;
    }
    return false;
  });

  //SITIO POR
  var wpath = location.pathname;
  if(wpath == '/contacto/'){
    var siteby = '<div style="position: absolute; right: 10px; top: 10px; text-transform: uppercase; font-size: 10px; color: rgb(84, 84, 84); letter-spacing: 0.5px;"><a style="color: rgb(84, 84, 84);" href="http://www.somosunachulada.mx">sitio por la chulada</a></div>';
    //$('body').prepend(siteby);
  }

});