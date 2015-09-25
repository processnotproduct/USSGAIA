(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization General Scripts for all pages
		/* ---------------------------------------------- */

		var homeSection = $('.home-section'),
			navbar      = $('.navbar-custom'),
			navHeight   = navbar.height(),
			width       = Math.max($(window).width(), window.innerWidth),
			mobileTest;

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		}

		navbarAnimation(navbar, homeSection, navHeight);
		navbarSubmenu(width);
		hoverDropdown(width, mobileTest);

		$(window).resize(function() {
			var width = Math.max($(window).width(), window.innerWidth);
			hoverDropdown(width, mobileTest);
		});

		$(window).scroll(function() {
			navbarAnimation(navbar, homeSection, navHeight);
		});

		/* ---------------------------------------------- /*
		 * Home section height */
		/* ---------------------------------------------- */

		function greedyJumbotron() {
		    var HEIGHT_CHANGE_TOLERANCE = 100; // Approximately URL bar height in Chrome on tablet

		    var jumbotron = $(this);
		    var viewportHeight = $(window).height();

		    $(window).resize(function () {
		        if (Math.abs(viewportHeight - $(window).height()) > HEIGHT_CHANGE_TOLERANCE) {
		            viewportHeight = $(window).height();
		            update();
		        }
		    });

		    function update() {
		        jumbotron.css('height', viewportHeight + 'px');
		    }

		    update();
		}

		$('.greedy-jumbotron').each(greedyJumbotron);

		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		function navbarAnimation(navbar, homeSection, navHeight) {
			var topScroll = $(window).scrollTop();
			if (navbar.length > 0 && homeSection.length > 0) {
				if(topScroll >= navHeight) {
					navbar.removeClass('navbar-transparent');
				} else {
					navbar.addClass('navbar-transparent');
				}
			}
		};

		/* ---------------------------------------------- /*
		 * Navbar submenu
		/* ---------------------------------------------- */

		function navbarSubmenu(width) {
			if (width > 767) {
				$('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
					var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
					var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
					if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
						$(this).children('.dropdown-menu').addClass('leftauto');
					} else {
						$(this).children('.dropdown-menu').removeClass('leftauto');
					}
					if ($('.dropdown', $(this)).length > 0) {
						var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
						if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
							$(this).children('.dropdown-menu').addClass('left-side');
						} else {
							$(this).children('.dropdown-menu').removeClass('left-side');
						}
					}
				});
			}
		};

		/* ---------------------------------------------- /*
		 * Navbar hover dropdown on desktop
		/* ---------------------------------------------- */

		function hoverDropdown(width, mobileTest) {
			if ((width > 767) && (mobileTest != true)) {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
				var delay = 0;
				var setTimeoutConst;
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
					var $this = $(this);
					setTimeoutConst = setTimeout(function() {
						$this.addClass('open');
						$this.find('.dropdown-toggle').addClass('disabled');
					}, delay);
				},
				function() {
					clearTimeout(setTimeoutConst);
					$(this).removeClass('open');
					$(this).find('.dropdown-toggle').removeClass('disabled');
				});
			} else {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
				$('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
					event.preventDefault();
					event.stopPropagation();
					$(this).parent().siblings().removeClass('open');
					$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
					$(this).parent().toggleClass('open');
				});
			}
		};

		/* ---------------------------------------------- /*
		 * Navbar collapse on click
		/* ---------------------------------------------- */

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Set sections backgrounds
		/* ---------------------------------------------- */
		// MOD TK Added .video-bg
		var module = $('.home-section, .video-bg, .module, .module-small, .side-image');
		module.each(function(i) {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* ---------------------------------------------- /*
		 * Testimonials, Post sliders
		/* ---------------------------------------------- */

		if ($('.testimonials-slider').length > 0 ) {
			$('.testimonials-slider').flexslider( {
				controlNav: false,
				directionNav: false,
				animation: "slide",
			});
		};

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		// $('.section-scroll').bind('click', function(e) {
		// 	var anchor = $(this);
		// 	$('html, body').stop().animate({
		// 		scrollTop: $(anchor.attr('href')).offset().top
		// 	}, 1000);
		// 	e.preventDefault();
		// });
		
		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').find('input,textarea').jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault();

				var submit          = $('#contact-form submit');
				var ajaxResponse    = $('#contact-response');

				var name            = $("input#cname").val();
				var email           = $("input#cemail").val();
				var subject         = $("input#csubject").val();
				var message         = $("textarea#cmessage").val();

				$.ajax({
					type: 'POST',
					url: './php/contact.php',
					dataType: 'json',
					data: {
						name: name,
						email: email,
						subject: subject,
						message: message,
					},
					cache: false,
					beforeSend: function(result) {
						submit.empty();
						submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							$form.fadeOut(500);
							setTimeout(function(){ 
								ajaxResponse.html(result.message);
								document.getElementById('contact-response').style.display = 'block';
							}, 500);
						} else {
							ajaxResponse.html(result.message);
						}
					}
				});
			}
		});

		/* ---------------------------------------------- /*
		 * Subscribe form ajax
		/* ---------------------------------------------- */

		$('#subscription-form').submit(function(e) {

			e.preventDefault();
			var $form           = $('#subscription-form');
			var submit          = $('#subscription-form submit');
			var ajaxResponse    = $('#subscription-response');
			var email           = $('input#semail').val();

			$.ajax({
				type: 'POST',
				url: './php/subscribe.php',
				dataType: 'json',
				data: {
					email: email
				},
				cache: false,
				beforeSend: function(result) {
					submit.empty();
					submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
				},
				success: function(result) {
					if(result.sendstatus == 1) {
						$form.fadeOut(500);
						setTimeout(function(){ 
								ajaxResponse.html(result.message);
							}, 500);
					} else {
						ajaxResponse.html(result.message);
					}
				}
			});

		});

	});

})(jQuery);