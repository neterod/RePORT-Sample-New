(function ($) {
    'use strict';

    var $body =  $('html, body'), // $('html, body'),
        $backToTop,
        showBackToTop = false;

    $(document).ready(function () {
        $backToTop = $('#back-to-top');

        if ($backToTop.length !== 0) {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 150) { // Offset from the top
                    if (showBackToTop === false) {
                        $backToTop.addClass('active');
                        showBackToTop = true;
                    }
                } else {
                    if (showBackToTop === true) {
                        $backToTop.removeClass('active');
                        showBackToTop = false;
                    }
                }
            });

            $backToTop.on('click', function (event) {
                event.preventDefault();
                $body.animate({
                    scrollTop: 0
                }, 400);
            });
        }
    });
}(jQuery));
