export const swipable = (tabCount, tabClass, component) => {
        let tabContent = document.getElementsByClassName(tabClass)
        for (var i = 0; i < tabContent.length; i++) {
          // tabContent[i].addEventListener('click', myFunction, false);
          tabContent[i].addEventListener('touchstart', handleTouchStart, false);
          tabContent[i].addEventListener('touchmove', handleTouchMove, false);
        }


        function handleSwipe1(next) {
          if (component.ActiveTab == tabCount && next == 1) {
            component.ActiveTab = 0
          } else if (component.ActiveTab == 0 && next == -1) {
            component.ActiveTab = tabCount
          } else component.ActiveTab += next
        }

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
          return evt.touches || // browser API
            evt.originalEvent.touches; // jQuery
        }

        function handleTouchStart(evt) {
          const firstTouch = getTouches(evt)[0];
          xDown = firstTouch.clientX;
          yDown = firstTouch.clientY;
        };

        function handleTouchMove(evt) {
          if (!xDown || !yDown) {
            return;
          }

          var xUp = evt.touches[0].clientX;
          var yUp = evt.touches[0].clientY;

          var xDiff = xDown - xUp;
          var yDiff = yDown - yUp;

          if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
              /* left swipe */

              handleSwipe1(1)
            } else {
              handleSwipe1(-1)
            }
          } else {
            if (yDiff > 0) {
              /* up swipe */
            } else {
              /* down swipe */
            }
          }
          /* reset values */
          xDown = null;
          yDown = null;
        };
}