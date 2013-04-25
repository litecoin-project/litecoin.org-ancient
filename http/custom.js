//
// Copyright (c) 2013 Litecoin Developers
//

__locale = null;
try {

	if(typeof(sessionStorage) != 'undefined') {
		if(!sessionStorage['litecoin-locale']) {
			sessionStorage.setItem('litecoin-locale', true);
			var language = navigator.language ? navigator.language : navigator.userLanguage;
			__locale = language.split('-')[0];
		}
	}

} catch(ex) { __locale = null; }

if(__locale && document.location.pathname == '/'+__locale)
	document.location.href = '/'+__locale;

jQuery(document).ready(function($) {

	$('.alignright img').tipsy({fade: true});

	function scroller(anc) {  
	    target = $(anc);  
	    $('html, body').animate({  
	        scrollTop: target.offset().top  
	    }, 1000);  
	}

	$(".viewall").click(function() {  
	    scroller(".features");  
	});

	$('#images a img').first().addClass("active");
	$('#images a').click(function(e){
		image = $(this);
		e.preventDefault();
		$('.screenshot').stop().animate({opacity:0.5}, 250, function() {
			$(this).attr('src',image.attr('href'));
		});
		$('.screenshot').animate({opacity:1}, 500);
		$('#images img').removeClass("active");
		image.find("img").addClass("active");
	});
});