<?php 
    define('WP_USE_THEMES', false);
	require('_cms/wp-load.php');
	//GET CUSTOM POST
	global $post;
	global $postBackstage;

?>
<!doctype html>
<html lang="en-GB" dir="ltr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="_css/_style.css" media="all">
<link href="_css/jquery-ui-1.8.12.custom.css" rel="stylesheet" media="screen">
<link rel="stylesheet" type="text/css" href="_css/superfish.css" media="screen">
<link type="text/css" href="_css/jquery.jscrollpane.css" rel="stylesheet" media="all" />

<link rel="stylesheet" type="text/css" href="_js/libs/fancybox/jquery.fancybox-1.3.4.css" media="screen" />

<link rel="stylesheet" href="_css/supersized.css" type="text/css" media="screen" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="_js/libs/jquery.videobackground.js"></script>
<script type="text/javascript" src="_js/libs/hoverIntent.js"></script>
<script type="text/javascript" src="_js/libs/superfish.js"></script>
<script type="text/javascript" src="_js/libs/jquery.address-1.4.min.js"></script>

<script type="text/javascript" src="_js/libs/supersized.3.2.7.js"></script>

<script type="text/javascript" src="_js/libs/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="_js/libs/jquery.mousewheel.js"></script>
<script type="text/javascript" src="_js/libs/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="_js/libs/jquery.masonry.js"></script>

<script defer src="_js/libs/jquery.scrollTo-min.js"></script>

<script type="text/javascript" src="_js/libs/fancybox/jquery.fancybox-1.3.4.pack.js"></script>

<script src="_js/libs/twitter.js"></script>	

<script type="text/javascript" src="_js/_192.js"></script>

<title>192</title>
</head>

<body>
<div id="wrapper">
    <!-- HEADER SECTION-->
  	<div id="header_section" class="positionAbs"></div>
    <div id="header_main" class="positionAbs">
        <div id="logo_home"><a href="/home"><img src="_images/_logo.png" width="178" height="105" border="0"></a></div>
        <div id="icons_home">
            <div class="icon_img_home"><a id="shop" href="_buy_192.html">
            	<img src="_images/_icon_shop.png" width="19" height="19" border="0" class="iconBtnY">
            	<img src="_images/_icon_shop_w.png" width="19" height="19" border="0" class="iconBtnW" style="display:none">
            </a></div>
            <div class="icon_img_home"><a href="http://www.facebook.com/pages/Revista-192/249001241796948" target="_blank">
            	<img src="_images/_icon_fb.png" width="19" height="19" border="0" class="iconBtnY">
                <img src="_images/_icon_fb_w.png" width="19" height="19" border="0" class="iconBtnW" style="display:none">
            </a></div>
            <!-- Twitter Feed -->
            <div id="jstwitter">
             	
            </div>
            <div class="icon_img_home" id="showTwitter">
            	<img src="_images/_icon_tt.png" width="19" height="19" class="iconBtnY">
                <img src="_images/_icon_tt_w.png" width="19" height="19" class="iconBtnW" style="display:none">
            </div>
            <div class="icon_img_home" id="btnMute">
            	<img src="_images/_icon_volume_on.png" width="19" height="19" class="iconBtnY">
                <img src="_images/_icon_volume_on_w.png" width="19" height="19" class="iconBtnW" style="display:none">
            </div>
            <div class="icon_img_home" id="btnUnmute">
            	<img src="_images/_icon_volume_off.png" width="19" height="19" class="iconBtnY">
                <img src="_images/_icon_volume_off_w.png" width="19" height="19" class="iconBtnW" style="display:none">
            </div>
           
      </div>
    </div>    
	<div id="menu_home" class="positionRel">
    	
    	<div id="menu_home_container">
        	<ul class="sf-menu">
            	<li><a href="#blog" id="blog">BLOG</a>
                </li>
                <li><a href="#">CONTENIDO</a>
					<ul>
                    <? 
					   	$the_query = new WP_Query( array( 'numberposts' => 10, 'post_status' => 'publish', 'post_type' => array('wardrobe', 'entrevista', 'product') ) );
					   	while ( $the_query->have_posts() ) : $the_query->the_post();
					?>
					   	<li><a href="/contenido/<? echo $post->post_name; ?>" id="<? the_title(); ?>" class="submenuItem" data-id="<? the_ID(); ?>"><? the_title(); ?></a></li>
					<?
						endwhile;
						wp_reset_postdata(); 
					?>
          				
					</ul>
				</li>
                <li><a href="#">BACKSTAGE</a>
                	<ul>
                    <?
						$the_backstage = new WP_Query( array( 'numberposts' => 10, 'post_status' => 'publish', 'post_type' => 'backstage'));
					   	while ( $the_backstage->have_posts() ) : $the_backstage->the_post();
					?>
					   		<li><a href="/backstage/<? echo $post->post_name; ?>" id="<? the_title(); ?>" class="submenuItem" data-id="<? the_ID(); ?>"><? the_title(); ?></a></li>
					<?
						endwhile;
						wp_reset_postdata(); 
					?>
          				
					</ul>
                </li>
                <li><a href="/nosotros/">NOSOTROS</a>
                </li>
            </ul>
        
        
        </div>
    </div>
  <div id="arrowLeft" class="btnL"><img src="_images/back.png" width="43" height="43" border="0"></div>
  <div id="arrowRight" class="btnR"><img src="_images/forward.png" width="43" height="43" border="0"></div>
  
  <div id="arrowLeftPost" class="btnLPost"><a href="/blog"><img src="_images/back_post.png" width="43" height="43" border="0"></a></div>
  <div id="arrowRightPost" class="btnRPost"><a href="/blog"><img src="_images/forward_post.png" width="43" height="43" border="0"></a></div>

  <!-- <div id="blogHome" class="transitions-enabled infinite-scroll clearfix"></div> -->
  
</div>

</body>
</html>