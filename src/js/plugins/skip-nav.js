(function ($) {
    'use strict';

    $('#skip-nav').click(function (event) {
        var skipTo = '#' + this.href.split('#')[1];

        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
            $(this).removeAttr('tabindex');
        }).focus();
    });
}(jQuery));
