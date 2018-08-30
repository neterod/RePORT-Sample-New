(function ($) {
    'use strict';

    function viewport () {
        var e = window,
            a = 'inner';

        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }

        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    }

    function mobileCheck () {
        if (viewport().width < 992) {
            window.isMobile = true;
        } else {
            window.isMobile = false;
        }
    }

    window.mobileCheck = mobileCheck;
}(jQuery));
