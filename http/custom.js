//
// Copyright (c) 2013 Litecoin Project
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

$(document).ready(function($) {

	$('.alignright img').tipsy({fade: true});

	var images = [	"images/linux-send.png", 
					"images/linux-receive.png", 
					"images/linux-transactions.png", 
					"images/linux-main.png" ];
	
	var alt = 0;
	var freq = 8000;
	var t = 1500;

	function crossfade() {
		var next = images.shift();
		images.push(next);
		var cls_current = '.screen-'+alt;
		alt = alt ^ 1;
		var cls_next = '.screen-'+alt;

		$(cls_next).attr('src', next);
		$(cls_next).animate({opacity: 1.0}, t / 2, 'linear');
		$(cls_current).animate({opacity: 0.0}, t, 'linear');
	}

	setInterval(crossfade, freq);
});
