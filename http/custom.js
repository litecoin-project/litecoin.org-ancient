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

function Popup(key, voffset) {

	var popup_visible = false;
	var mouse_local = false;

	function make_visible(show) {
		if(show && !popup_visible) {
			$("#litecoin-"+key).css({visibility:'visible'});
			$("#litecoin-"+key).fadeTo("fast", 1.0);
			popup_visible = true;
		}
		else
		if(popup_visible)
		{
			$("#litecoin-"+key).css({ display : 'none', 'opacity' : 0 });	
			$("#litecoin-"+key).css({visibility:'hidden'});
			popup_visible = false;
			// mouse_local = false;
		}
	}

	$("#"+key+"-image").mouseenter(function() {
		make_visible(true);
		mouse_local = true;

		var $e = $("#"+key+"-image");
		var offset = $e.offset();
		rect = {
			left : offset.left - 10,
			top : offset.top,
			right : offset.left+$e.width() + 10,
			bottom : offset.top+$e.height() + 14
		}
	})

	//$("#"+key+"-image").mouseout(function(e) {
	//})

	var rect = null;
	$("#litecoin-"+key).mouseenter(function() {
		mouse_local = true;
		if(cleanup_timeout) {
			clearTimeout(cleanup_timeout);
			cleanup_timeout = null;
		}

		var $e = $("#litecoin-"+key);
		var offset = $e.offset();
		rect = {
			left : offset.left,
			top : offset.top,
			right : offset.left+$e.width(),
			bottom : offset.top+$e.height() + (voffset || 0)
		}
	})

	var cleanup_timeout = null;
	$(document).mousemove(function(e) {
		if(!mouse_local && popup_visible) {
			make_visible(false);
		}
		else if(mouse_local && rect) {
			if(e.clientX < rect.left || e.clientX > rect.right ||
				e.clientY < rect.top || e.clientY > rect.bottom) {

				if(!cleanup_timeout)
					cleanup_timeout = setTimeout(function() {
						rect = null;
						mouse_local = false;
						make_visible(false);
						cleanup_timeout = null;
					}, 200)
			}
			else if(cleanup_timeout) {
				clearTimeout(cleanup_timeout);
				cleanup_timeout = null;
			}
		}
	});
}

$(document).ready(function($) {

	$('.hint').tipsy({fade: true});

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

	var gplus = new Popup('gplus', 60);
	var twitter = new Popup('twitter');
});
