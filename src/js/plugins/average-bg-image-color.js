(function ($) {
    'use strict';

    function isBackgroundDark(rgb) {
        var inputColor = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000),

        isDark = (inputColor > 125) ? false : true;

        return isDark;
      }

    $.fn.detectBackgroundImageColor = function () {
        $(this).each(function () {
            var self = $(this),
            bgImage,
            imgEl,
            blockSize = 5, // only visit every 5 pixels
            defaultRGB = {
                r: 0,
                g: 0,
                b: 0
            }, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {
                r: 0,
                g: 0,
                b: 0
            },
            count = 0;

            if (!context) {
                return defaultRGB;
            }

            bgImage = self.css('background-image');

            if (bgImage && bgImage !== 'none') {
                bgImage = bgImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    
                imgEl = new Image();
    
                imgEl.onload = function () {
                    width = imgEl.width;
                    height = imgEl.height;
    
                    canvas.width = width;
                    canvas.height = height;
    
                    context.drawImage(imgEl, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    
                    try {
                        data = context.getImageData(0, 0, width, height);
                    } catch(e) {
                        /* security error, img on diff domain */
                        console.error('image security domain error');
                        return defaultRGB;
                    }
            
                    length = data.data.length;
            
                    while ((i += blockSize * 4) < length) {
                        ++count;
                        rgb.r += data.data[i];
                        rgb.g += data.data[i+1];
                        rgb.b += data.data[i+2];
                    }
    
                    // ~~ used to floor values
                    rgb.r = ~~(rgb.r/count);
                    rgb.g = ~~(rgb.g/count);
                    rgb.b = ~~(rgb.b/count);
    
                    // set background color based on image color for 508 fall back
                    self.css('background-color', 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')');
    
                    if(isBackgroundDark(rgb)) {
                        self.addClass('inverse');
                    }
    
                    // return rgb;
                    // return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                };
    
                // set image src last to kick off process
                imgEl.src = bgImage;
            }
        });

        // if (self.prop('tagName') === 'IMG') {
        //     height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        //     width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        // }

        // $('body').prepend(canvas);

        // console.log(height);
        // console.log(width);
    };
}(jQuery));
