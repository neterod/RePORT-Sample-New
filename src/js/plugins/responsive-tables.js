(function ($) {
    'use strict';

    $.fn.addMobileTableHeaders = function () {
        this.each(function () {
            var $table = $(this),
                $headers = $table.find('th');

            $table.find('tr').each(function () {
                $(this).find('th, td').each(function (i) {
                    var $cell = $(this),
                        headerText = $headers.eq(i).text().trim();

                    if (!$cell.attr('data-label') && headerText) {
                        $(this).attr('data-label', headerText + ':');
                    }
                });
            });
        });

        return this;
    };
}(jQuery));
