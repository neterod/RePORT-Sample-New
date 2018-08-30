(function ($) {
    'use strict';

    $.fn.convertSVGsToInline = function () {
        var self = $(this),
            target;

        function getSVG (img, callback) {
            $.ajax({
                url: img.attr('src'),
                dataType: 'text',
                success: function (data) {
                    callback(data, img);
                },
                error: function (err) {
                    console.error(err, img);
                }
            });

        }

        function parseSVG (rawSVG, originalImg) {
            var $svg = $(rawSVG),
                svgId = originalImg.attr('id'),
                svgClass = originalImg.attr('class'),
                svgAlt = originalImg.attr('alt');

            // remove emdedded styles if they exist
            $svg.find('style').remove();

            // remove any ids embedded in SVG to prevent duplicates for 508
            $svg.removeAttr('id').removeAttr('style', '');

            if (svgId) {
                if ($(svgId).length === 0) {
                    $svg.attr('id', svgId);
                }
            }

            if (svgClass) {
                $svg.attr('class', svgClass);
            }

            if (svgAlt) {
                $svg.prepend('<title>' + svgAlt + '</title>');
            }

            originalImg.replaceWith($svg);
        }

        if (self.prop('tagName') === 'IMG' && self.attr('src').toLowerCase().match(/svg$/)) {
            target = self;
        } else {
            target = self.find('img[src$=".svg"]');
        }

        target.each(function() {
            getSVG($(this), parseSVG);
        });

        return this;
    };
}(jQuery));
