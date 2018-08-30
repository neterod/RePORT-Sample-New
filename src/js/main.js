(function ($) {
    'use strict';

    $(document).ready(function () {
        var flexsliderDOM = $('.flexslider'),
            flexslider,
            navbarCollapse = $('.navbar-collapse');

        window.mobileCheck();
        window.buildNavigation();
        window.textResizerInit();
        window.parallaxInit();
        window.addFileReaderDownloadLinks();

        $('#content').breakLongURLs();
        $('body').convertSVGsToInline();
        $('#example-table').addMobileTableHeaders();

        if (flexsliderDOM.length !== 0) {
            flexsliderDOM.flexslider({
                animation: 'slide',
                animationLoop: true
            });

            flexslider = flexsliderDOM.data('flexslider');
        }

        $('.slides .slide, .jumbotron').detectBackgroundImageColor();

        $(window).resize(function () {
            window.mobileCheck();

            if (!window.isMobile) {
                // hide open mobile nav when sizing up to desktop
                navbarCollapse.height('');
            }
        });
    });


}(jQuery));
