(function ($) {
    'use strict';

    $.fn.breakLongURLs = function () {
        var self = $(this),
            target,
            link,
            text;

        if (self.prop('tagName') === 'A') {
            target = self;
        } else {
            target = self.find('a');
        }

        target.each(function () {
            link = $(this);
            text = link.text();

            if (text.indexOf('http') === 0 || (text.indexOf(' ') === -1 && text.length >= 20)) {
                link.css('word-break', 'break-all');
            }
        });
    }
}(jQuery));
