/*------------------------------------
	Theme Name: Business
	Start Date :
	End Date : 
	Last change: 
	Version: 1.0
	Assigned to:
	Primary use:
---------------------------------------*/
/*	

	+ Responsive Caret*
	+ Expand Panel Resize*
	+ Sticky Menu*
	
	+ Document On Ready
		- Scrolling Navigation*
		- Set Sticky Menu*
		- Responsive Caret*
		- Expand Panel*
		- Collapse Panel*
	
	+ Window On Scroll
		- Set Sticky Menu
		
	+ Window On Resize
		- Expand Panel Resize
		
	+ Window On Load
		- Site Loader
		
*/

(function($) {
	
	"use strict"

	/* + Portfolio */
	function portfolio() {
		if($(".portfolio-list").length) {
			var $container = $(".portfolio-list");
			$container.isotope({
				layoutMode: 'fitRows',
				percentPosition: true,				
				itemSelector: ".portfolio-filter"
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });
				return false;
			});
		}
	}	
	
	/* + Responsive Caret* */
	function menu_dropdown_open(){
		var width = $(window).width();
		if($(".ownavigation .navbar-nav li.ddl-active").length ) {
			if( width > 991 ) {
				$(".ownavigation .navbar-nav > li").removeClass("ddl-active");
				$(".ownavigation .navbar-nav li .dropdown-menu").removeAttr("style");
			}
		} else {
			$(".ownavigation .navbar-nav li .dropdown-menu").removeAttr("style");
		}
	}
	
	/* + Expand Panel Resize* */
	function panel_resize(){
		var width = $(window).width();
		if( width > 991 ) {
			if($("header .slidepanel").length ) {
				$("header .slidepanel").removeAttr("style");
			}
		}
	}

	/* + Sticky Menu* */
	function sticky_menu() {
		var menu_scroll = $("body").offset().top;
		var scroll_top = $(window).scrollTop();
		var height = $(window).height();
		var body_height = $("body").height();
		var header_height = $(".header-fix").height();
		var a = height + header_height + header_height;
		if( body_height > a  ){	
			if ( scroll_top > menu_scroll ) {
				$(".header-fix").addClass("fixed-top animated fadeInDown");
				$("body").css("padding-top",header_height);
			} else {
				$(".header-fix").removeClass("fixed-top animated fadeInDown"); 
				$("body").css("padding-top","0");
			}
		} else {
			$(".header-fix").removeClass("fixed-top animated fadeInDown"); 
			$("body").css("padding-top","0");
		}
	}
	
	/* + Google Map* */
	function initialize(obj) {
		var lat = $("#"+obj).attr("data-lat");
        var lng = $("#"+obj).attr("data-lng");
		var contentString = $("#"+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "assets/images/pointer.png";
		var zoomLevel = parseInt($("#"+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},
					  {"featureType": "landscape","elementType": "all","stylers": [{"saturation": -100},{"lightness": 65},{"visibility": "on"}]},
					  {"featureType": "poi","elementType": "all","stylers": [{"saturation": -100},{"lightness": 51},{"visibility": "simplified"}]},
					  {"featureType": "road.highway","elementType": "all","stylers": [{"saturation": -100},{"visibility": "simplified"}]},
					  {"featureType": "road.arterial","elementType": "all","stylers": [{"saturation": -100},{"lightness": 30},{"visibility": "on"}]},
					  {"featureType": "road.local","elementType": "all","stylers": [{"saturation": -100},{"lightness": 40},{"visibility": "on"}]},
					  {"featureType": "transit","elementType": "all","stylers": [{"saturation": -100},{"visibility": "simplified"}]},
					  {"featureType": "transit","elementType": "geometry.fill","stylers": [{"visibility": "on"}]}, 
					  {"featureType": "water","elementType": "geometry","stylers": [{"hue": "#ffff00"},{"lightness": -25},{"saturation": -97}]},
					  {"featureType": "water","elementType": "labels","stylers": [{"visibility": "on"},{"lightness": -25},{"saturation": -100}]}]
					  
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		
		map.mapTypes.set("map_style", styledMap);
		map.setMapTypeId("map_style");
		
		if( contentString != "" ) {
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
		}		
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});
	}
	
	/* + Document On Ready */
	$(document).on("ready", function() {

		/* - Scrolling Navigation* */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu* */
		if( $(".header-fix").length ) {
			sticky_menu();
		}
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});

		/* - Responsive Caret* */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Expand Panel* */
		$( "[id*='slideit-']" ).each(function (index) { 
			index++;
			$("[id*='slideit-"+index+"']").on("click", function() {
				$("[id*='slidepanel-"+index+"']").slideDown(1000);
				$("header").animate({ scrollTop: 0 }, 1000);
			});
		});

		/* - Collapse Panel * */
		$( "[id*='closeit-']" ).each(function (index) {
			index++;			
			$("[id*='closeit-"+index+"']").on("click", function() {
				$("[id*='slidepanel-"+index+"']").slideUp("slow");			
				$("header").animate({ scrollTop: 0 }, 1000);
			});
		});
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click * */
		$( "[id*='toggle-']" ).each(function (index) { 
			index++;
			$("[id*='toggle-"+index+"'] a").on("click", function() {
				$("[id*='toggle-"+index+"'] a").toggle();
			});
		});
		
		/* - Back To Top */
		$("#back-to-top").on("click",function()
		{
			$("body,html").animate(
			{
				scrollTop : 0 // Scroll to top of body
			},2000);
		});

		/* - Slider Section */
		if($("#bz-slide1").length) {
			var revapi26,
			tpj=jQuery;
			if(tpj("#bz-slide1").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide1");
			}else{
				revapi26 = tpj("#bz-slide1").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:575,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"bottom",
								h_offset:0,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"bottom",
								h_offset:0,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:20,
							space:5,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide2").length) {
			var revapi27,
			tpj=jQuery;
			if(tpj("#bz-slide2").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide2");
			}else{
				revapi27 = tpj("#bz-slide2").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"right",
								v_align:"center",
								h_offset:40,
								v_offset:-36
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:40,
								v_offset:36
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:35,
							space:5,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide3").length) {
			var revapi28,
			tpj=jQuery;

			if(tpj("#bz-slide3").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide3");
			}else{
				revapi28 = tpj("#bz-slide3").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"right",
								v_align:"top",
								h_offset:30,
								v_offset:123
							},
							right: {
								h_align:"right",
								v_align:"top",
								h_offset:30,
								v_offset:60
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:20,
							space:5,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide7").length) {
			var revapi29,
			tpj=jQuery;
			if(tpj("#bz-slide7").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide7");
			}else{
				revapi29 = tpj("#bz-slide7").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:0,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:0,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:20,
							space:5,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide8").length) {
			var revapi30,
			tpj=jQuery;
			
			if(tpj("#bz-slide8").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide8");
			}else{
				revapi30 = tpj("#bz-slide8").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:0,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:0,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:20,
							v_offset:40,
							space:10,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide9").length) {
			var revapi31,
			tpj=jQuery;
			if(tpj("#bz-slide9").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide9");
			}else{
				revapi31 = tpj("#bz-slide9").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:20,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:20,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							style:"hermes",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:36,
							space:10,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		if($("#bz-slide10").length) {
			var revapi32,
			tpj=jQuery;
			if(tpj("#bz-slide10").revolution === undefined){
				revslider_showDoubleJqueryError("#bz-slide10");
			}else{
				revapi32 = tpj("#bz-slide10").show().revolution({
					sliderType:"standard",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
									mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_over:1920,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"bottom",
								h_offset:0,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"bottom",
								h_offset:0,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							style:"gyges",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:-65,
							space:5,
							tmp:''
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[1920,1024,778,480],
					gridheight:[658,520,410,350],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}
		
		/* - Portfolio */
		portfolio();
		if($(".portfolio-box").length){
			var url;
			$(".portfolio-box .portfolio-detail").magnificPopup({
				delegate: "a.zoom",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}

		/* - Vertical Tabs */
		if($(".vertical-tabs").length){
			var url;
			$(".vertical-tabs .tab-content .img-block > div").magnificPopup({
				delegate: "a",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}

		if($(".post-gallery").length){
			var url;
			$(".post-gallery div").magnificPopup({
				delegate: "a",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}		
		
		/* - Team */
		if( $(".team-carousel.owl-carousel").length ) {
			$(".team-carousel.owl-carousel").owlCarousel({
				loop: true,
				margin: 30,
				nav: false,
				dots: true,
				autoplay: true,
				items: 4,
				responsive:{
					0:{
						items: 1
					},
					576:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					}
				}
			});
		}
		
		/* - Testimonial Slider */
		if( $(".testimonial-slider").length ) {
			if($('html[dir="rtl"]').length) {
				$(".testimonial-slider").slick({
					centerMode: true,
					centerPadding: "190px",
					slidesToShow: 3,
					autoplay: true,
					rtl: true,
					responsive: [
						{
							breakpoint: 1366,
							settings: {
								centerPadding: "90px",
							}
						},
						{
							breakpoint: 1200,
							settings: {
								centerPadding: "0",
							}
						},
						{
							breakpoint: 768,
							settings: {
								arrows: false,
								centerMode: true,
								centerPadding: "0",
								slidesToShow: 1
							}
						}
					]
				});
			} else {
				$(".testimonial-slider").slick({
					centerMode: true,
					centerPadding: "190px",
					slidesToShow: 3,
					autoplay: true,
					responsive: [
						{
							breakpoint: 1366,
							settings: {
								centerPadding: "90px",
							}
						},
						{
							breakpoint: 1200,
							settings: {
								centerPadding: "0",
							}
						},
						{
							breakpoint: 768,
							settings: {
								arrows: false,
								centerMode: true,
								centerPadding: "0",
								slidesToShow: 1
							}
						}
					]
				});
			}
			$(".slick-slider").on("click", ".slick-slide", function (e) {
				e.stopPropagation();
				var index = $(this).data("slick-index");
				if ($(".slick-slider").slick("slickCurrentSlide") !== index) {
					$(".slick-slider").slick("slickGoTo", index);
				}
			});
		}
		
		/* - Testimonial Section */
		if( $(".tesimonial-carousel-3.owl-carousel").length ) {
			$(".tesimonial-carousel-3.owl-carousel").owlCarousel({
				loop: true,
				margin: 30,
				nav: false,
				dots: true,
				autoplay: true,
				items: 4,
				responsive:{
					0:{
						items: 1
					},
					576:{
						items: 2
					},
					992:{
						items: 3
					}
				}
			});
		}
		
		/* - Skill block */
		$( " [id*='skill_type-'] " ).each(function ()
		{
			var ele_id = 0;
			ele_id = $(this).attr('id').split("-")[1];
			
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{			
				var skill_type1_item_count = 0;
				var skill_type1_count = 0;					
				skill_type1_item_count = $( "[id*='skill_"+ ele_id +"_count-']" ).length;				
				
				for(var i=1; i<=skill_type1_item_count; i++)
				{
					skill_type1_count = $( "[id*='skill_"+ ele_id +"_count-"+i+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").animateNumber({ number: skill_type1_count }, 3000);
				}
				
				var skill_bar_count = 0;
				var skills_bar_count = 0;
				skill_bar_count = $( "[id*='skill_bar_"+ ele_id +"_count-']" ).length;
				
				for(var j=1; j<=skill_bar_count; j++)
				{
					skills_bar_count = $( "[id*='skill_"+ ele_id +"_count-"+j+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_bar_"+ ele_id +"_count-"+j+"']").css({'width': skills_bar_count +'%'});
				}
			});
		});
		
		if($(".counter-section").length) {
			$( "[id*='counter_section-']" ).each(function ()
			{
				var ele_id = 0;
				ele_id = $(this).attr('id').split("-")[1];
				
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					var statistics_item_count = 0;
					var statistics_count = 0;					
					statistics_item_count = $( "[id*='statistics_"+ ele_id +"_count-']" ).length;
					 
					for(var i=1; i<=statistics_item_count; i++)
					{
						statistics_count = $( "[id*='statistics_"+ ele_id +"_count-"+ i +"']" ).attr( "data-fact" );
						$("[id*='statistics_"+ ele_id +"_count-"+ i +"']").animateNumber({ number: statistics_count }, 4000);
					}				
				});
			});
		}
		
		/* - Woocommerce Tabs */
		$( '.wc-tabs-wrapper, .woocommerce-tabs' )
			.on( 'init', function() {
				$( '.wc-tab, .woocommerce-tabs .panel:not(.panel .panel)' ).hide();

				var hash  = window.location.hash;
				var url   = window.location.href;
				var $tabs = $( this ).find( '.wc-tabs, ul.tabs' ).first();

				if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
					$tabs.find( 'li.reviews_tab a' ).trigger("click");
				} else {
					$tabs.find( 'li:first a' ).trigger("click");
				}
			})
			.on( 'click', '.wc-tabs li a, ul.tabs li a', function() {
				var $tab          = $( this );
				var $tabs_wrapper = $tab.closest( '.wc-tabs-wrapper, .woocommerce-tabs' );
				var $tabs         = $tabs_wrapper.find( '.wc-tabs, ul.tabs' );

				$tabs.find( 'li' ).removeClass( 'active' );
				$tabs_wrapper.find( '.wc-tab, .panel:not(.panel .panel)' ).hide();

				$tab.closest( 'li' ).addClass( 'active' );
				$tabs_wrapper.find( $tab.attr( 'href' ) ).show();

				return false;
			})
			.trigger( 'init' );

		$( 'a.woocommerce-review-link' ).on("click", function() {
			$( '.reviews_tab a' ).trigger("click");
			return true;
		});
		
		/* - Gallery Detail */
		if( $(".gallery-details-thumb").length ){
			$('.gallery-details-thumb').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 230,
				itemMargin: 30,
				asNavFor: '.gallery-details-full'
			});

			$('.gallery-details-full').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				sync: ".gallery-details-thumb"
			});
		}
		
		if( $( "#contact-map-canvas").length === 1 ) {
			initialize( "contact-map-canvas" );
		}

		/* - Quick Contact Form* */
		$( "#btn_submit" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] === "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");
						$("#input_name").val("");
						$("#input_email").val("");
						$("#input_subject").val("");
						$("#textarea_message").val("");
						$("#alert-msg").show();
					}		
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});

		/* - Quick Contact Form* */
		$( "#btn_submit-2" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact-2.php",
				data: mydata,
				success: function(data) {
					if( data["type"] === "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");
						$("#input_name").val("");
						$("#input_email").val("");
						$("#input_subject").val("");
						$("#input_phone").val("");
						$("#textarea_message").val("");
						$("#alert-msg").show();
					}		
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});

		/* - Quick Contact Form* */
		$( "#btn_submit-3" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact-3.php",
				data: mydata,
				success: function(data) {
					if( data["type"] === "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");
						$("#input_name").val("");
						$("#input_email").val("");
						$("#textarea_message").val("");
						$("#alert-msg").show();
					}		
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});

	});	/* - Document On Ready /- */
	
	/* + Window On Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu* */
		if( $(".header-fix").length ) {
			sticky_menu();
		}
	});

	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		sticky_menu();
		
		/* - Expand Panel Resize */
		panel_resize();
		menu_dropdown_open();	
	});
	
	/* + Window On Load */
	$(window).on("load",function() {
		/* - Site Loader* */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		
		portfolio();
	});

})(jQuery);