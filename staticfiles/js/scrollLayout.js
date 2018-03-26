var scrollLayout = (function() {
	// cache and initialize some values
	var config = {
		// the cbp-fbscroller's sections
		$sections : $( '#fullpage > section' ),
		// the navigation links
		$navlinks : $( '#side-nav > nav:first > a' ),
		// a tags 
		$alinks : $( '#menu-nav > a' ),
		// index of current link / section
		currentLink : 0,
		// the body element
		$body : $( 'html, body' ),
		// the body animation speed
		animspeed : 650,
		// the body animation easing (jquery easing)
		animeasing : 'easeInOutExpo'
	};

	function init() {
		// click on a navigation link: the body is scrolled to the position of the respective section
		config.$navlinks.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			return false;
		} );

		// 2 waypoints defined:
		// First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		// Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		config.$sections.waypoint( function( direction ) {
			if( direction === 'down' ) { changeNav( $( this ) ); }
		}, { offset: '30%' } ).waypoint( function( direction ) {
			if( direction === 'up' ) { changeNav( $( this ) ); }
		}, { offset: '-30%' } );

		// on window resize: the body is scrolled to the position of the current section
		$( window ).on( 'debouncedresize', function() {
			scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
		} );

		$( '#scroll-down' ).click(function() {
			// get current active 
			scrollAnim( config.$sections.eq( $( '.cbp-fbcurrent' ).index() + 1 ).offset().top );
		});

		$( '#home .home-nav > div > a' ).on('click', function(event) {
			console.log(event.currentTarget.hash);
			var index;
			switch(event.currentTarget.hash) {
				case '##home': index = 0; break;
				case '##openings': index = 2; break;
				case '##process': index = 3; break;
			}
			scrollAnim( config.$sections.eq( index ).offset().top );
		});
		
	}

	// update the current navigation link
	function changeNav( $section ) {
		config.$navlinks.eq( config.currentLink ).removeClass( 'cbp-fbcurrent' );
		config.$alinks.eq( config.currentLink ).removeClass( 'menu-active-link' );
		config.currentLink = $section.index( 'section' );
		config.$navlinks.eq( config.currentLink ).addClass( 'cbp-fbcurrent' );
		config.$alinks.eq( config.currentLink ).addClass( 'menu-active-link' );

		// console.log( config.currentLink );
		// also update menu a links
	}

	// function to scroll / animate the body
	function scrollAnim( top ) {
		config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing );
	}

	return { init : init };

})();