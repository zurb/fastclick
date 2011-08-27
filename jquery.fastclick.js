/*!
 * jQuery fastclick Plugin
 * http://www.zurb.com/playground/
 * Ported from Ryan Fioravanti's fast button article
 * http://code.google.com/mobile/articles/fast_buttons.html
 *
 * Copyright 2011, ZURB
 * Released under the MIT License
 */
(function ($) {
  
  $.event.special.fastclick = {

		add: function (handleObj) {
		  var $this = $(this),
          startX,
          startY,
          coordinates = [];
		  
		  function onTouchStart(event) {
        event.stopPropagation();

        $(this).bind('touchend', onClick);
        $('body').bind('touchmove', onTouchMove);

        startX = event.originalEvent.touches[0].clientX;
        startY = event.originalEvent.touches[0].clientY;
      }
      
      function pop() {
        coordinates.splice(0, 2);
      }

      function preventGhostClick(x, y) {
        coordinates.push(x, y);
        window.setTimeout(pop, 2500);
      }

      function onClick(event) {
        event.stopPropagation();
        reset();
        handleObj.handler.apply(this, arguments);

        if (event.originalEvent.type == 'touchend') {
          preventGhostClick(startX, startY);
        }
      }

      function onTouchMove(event) {
        if (Math.abs(event.originalEvent.touches[0].clientX - startX) > 10 ||
            Math.abs(event.originalEvent.touches[0].clientY - startY) > 10) {
          reset();
        }
      }

      function reset() {
        $this.unbind('touchend');
        $('body').unbind('touchmove');
      }
      
      function clickBusterOnClick(event) {
        for (var i = 0; i < coordinates.length; i += 2) {
          var x = coordinates[i];
          var y = coordinates[i + 1];
          if (Math.abs(event.originalEvent.clientX - x) < 25 && Math.abs(event.originalEvent.clientY - y) < 25) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      }
		  
		  $this.bind('touchstart', onTouchStart);
      $this.bind('click', onClick);
		  $(document).bind('click', clickBusterOnClick);
		}
	};

}(jQuery));