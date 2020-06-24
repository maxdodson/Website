// Reveal .hideme elements when in view
function updateHideShow() {
	$('.hideme').each(function(i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if (bottom_of_window > bottom_of_object) {
			$(this).addClass('showme');
		}
	});
}

// Toggle transparent/opaque navbar
function updateNav() {
	var bottom_of_nav = $(window).scrollTop() + $('.navbar').height();
	var threshold = $('.jumbotron').height() / 4;

	if (bottom_of_nav > threshold) {
		$('.cta').removeClass('btn-light');
		$('.cta').addClass('btn-dark');
		$('.navbar').removeClass('bg-transparent');
		$('.navbar').addClass('bg-light');
		$('.navbar').addClass('navbar-light');
		$('.navbar').removeClass('navbar-dark');
		$('svg #Text').css('fill', '#41464d');
		$('body').css('--nav-hamburger-color', '#41464d');
	} else {
		$('.cta').removeClass('btn-dark');
		$('.cta').addClass('btn-light');
		$('.navbar').removeClass('bg-light');
		$('.navbar').addClass('bg-transparent');
		$('.navbar').removeClass('navbar-light');
		$('.navbar').addClass('navbar-dark');
		$('svg #Text').css('fill', 'white');
		$('body').css('--nav-hamburger-color','white');
	}
}

$(document).ready(function() {
	updateNav();
	updateHideShow();

	$(window).scroll(function() {
		updateHideShow();
		updateNav();
	});

    $('.navbar .container').on('click', '.navbar-toggler', function() {
		$('.cta').removeClass('btn-light');
		$('.cta').addClass('btn-dark');
        $('.navbar').removeClass('bg-transparent');
		$('.navbar').addClass('bg-light');
		$('.navbar').addClass('navbar-light');
		$('.navbar').removeClass('navbar-dark');
		$('svg #Text').css('fill', '#41464d');
        $('body').css('--nav-hamburger-color','#41464d');
        $(this).toggleClass('is-active');
    });

    // Smooth scrolling for URLs
    if (window.location['href'].includes('#')) {
		$('html, body').scrollTop($('html, body').scrollTop()-80);
		$('html, body').animate({'scrollTop': $('html, body').scrollTop()+10}, 500, 'swing');
	}

	// Smooth scrolling for anchor links
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		var nav = $('.navbar').height();

		$('html, body').stop().animate({'scrollTop': $target.offset().top - nav - $target.height()/3}, 900, 'swing', function() {
			if (window.scrollY != Math.floor($target.offset().top - nav - $target.height()/3)) {
				$('html, body').stop().animate({'scrollTop': $target.offset().top - ($target.height()/3)}, 500, 'swing');
			}
		});
	});
});