(function ($) {
    'use strict';

    function parallaxInit () {
        var $parallax = $('.parallax'),
            speed = 0.2;

        function parallaxScroll () {
            if (!isMobile) {
          [].slice.call($parallax).forEach(function (el, i) {
                    var windowYOffset = window.pageYOffset - el.offsetTop - 50,
                        elBackgrounPos = 'center ' + (windowYOffset * speed) + 'px';

                    el.style.backgroundPosition = elBackgrounPos;
                });
            } else {
          [].slice.call($parallax).forEach(function (el, i) {
                    el.style.backgroundPosition = 'center 0';
                });
            }
        }

        window.onscroll = function () {
            parallaxScroll();
        };

        parallaxScroll();
    }

    window.parallaxInit = parallaxInit;
}(jQuery));
