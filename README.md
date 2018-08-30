# NETE Bootstrap 4

Please note this documentation is in-progress and currently incomplete.


## Introduction

The NETE Bootstrap Template is our own custom copy of Bootstrap 4, which has been customized with various improvements and code that we commonly reuse across our projects.

While Bootstrap provides many great features out-of-the-box, we have found that we constantly need to extend it based on our client's needs. Over time, function that we end up re-using on multiple projects are added to the base template to save time.

These features are modularized into separate JavaScript and Sass files, so that unused components can easily be excluded to keep the deployed file sizes as minimal as possible.

-----------


## TOC
[Custom JS](#custom-js)

[Custom Sass](#custom-sass)

-----------


## Custom JS

The JavaScript is broken down by feature, with each major feature as a separate JS file in the 'plugins' folder inside the 'js' folder.

These are linked and complied with the main.js in the `gulpfile.js`. If you wish to exclude one of our custom JS plugins please comment it out from the gulpfile.

Custom JavaScript comprises the following:
* [average-bg-image-color.js](#average-bg-image-colorjs)
* [back-to-top.js](#back-to-topjs)
* [break-long-urls.js](#break-long-urlsjs)
* [convert-svg-inline.js](#convert-svg-inlinejs)
* [file-reader-downloads.js](#file-reader-downloadsjs)
* [mobile-check.js](#mobile-checkjs)
* [navbar.js](#navbarjs)
* [parallax.js](#parallaxjs)
* [responsive-tables.js](#responsive-tablesjs)
* [skip-nav.js](#skip-navjs)
* [text-resizer.js](#text-resizerjs)


### average-bg-image-color.js

This plugin is used to determine the average color of the background images for the slideshow and jumbotrons.  If the color is darker than a certain percentage, it will add the class `inverse` to the container. Our custom CSS defaults the slider text to black normally, and white when the inverse class is applied.

It then sets the background-color of the container to the average color detected, so that automated 508 checks, which check for a proper contrast ratio between the text and background color, will be compairing the text color to the correct background color. This prevents issues of scans seeing white text on a background which it thinks it also white, because these scans ignore background images.

By default `$('.slides .slide, .jumbotron').detectBackgroundImageColor();` is called in main.js on document ready.

### back-to-top.js

This is a simple plugin which adds a dynamically appearing "Back to Top" button when the user has scrolled a little ways down a page.


### break-long-urls.js

This is a jQuery extention function which will scan the page for links (starting with `http` or longer than 20 characters) and will add CSS `word-break: break-all;` so that they wrap nicely and don't overflow their containers.

#### Usage

Target all all links on the page. (not advised for performance)

```$('a').breakLongURLs();```

Targeting a single link using an id. (best performance)

```$('#some-link-id').breakLongURLs();```

Targeting a container will scan the target for all links. (default setup in `main.js`)

```$('#content').breakLongURLs();```

This is called in main.js on document ready.


### convert-svg-inline.js

This is a jQuery extention function which will scan the page or targeted container for SGVs linked using the `<img>` tag. The `<img>` tags are then repaced with the entire source of the SVGs inline.

This allows for control of the colors of the inline SVG using CSS (especially useful for changing colors on hover for buttons and links). As a standard, we add classes to all our SVG icons `color1`, `color2`, etc. based on the prominence and number of colors in the icon.

Keeping this standardized allows for easily swapping out icons without having to change the CSS which is changing the color.

By default `$('body').convertSVGsToInline();` is called in main.js on document ready.


### file-reader-downloads.js

This function scans the entire page for links to files which require a proprietary software to be read. if any of these file types are detected it will append a link to the corresponding free file reader.

Currenty checks for the following file reader types:

* Adobe Acrobat Reader (pdf)
* Microsoft Word Viewer (doc, docx, docm, rtf)
* Microsoft PowerPoint Viewer (ppt, pptx, pptm)
* Microsoft Excel Excel (xls, xlsx, xlsm)

`BuildNavigation();` is called in main.js on document ready.


### mobile-check.js

This is a simple function which checks the width of the device screen and sets the global boolian `isMobile`. Also refires on window resize.

This is used by several other functions (i.e. the mobile navigation) to determine which view the site is in.

By default `mobileCheck();` is called in main.js on document ready.


### navbar.js

This files has two custom function which are used to setup the nested mobile navigation, and desktop navigation dropdown.

By default `BuildNavigation();` is called in main.js on document ready.


### parallax.js

This function targets any element with the class `parallax` and sets its background image to have a smooth parallax effect.

By default `parallaxInit();` is called in main.js on document ready.


### responsive-tables.js

By default `$('#example-table').addMobileTableHeaders();` is called in main.js on document ready. This should be updated based on the tables in your site.

For static/server-side generated pages (i.e. Drupal) you could scope this to target all tables.

For dynamic pages, especially those using a front-end JavaScript framework such as Angular.js or Vue.js, you may consider not using this function at all and simply adding the `data-label` to your dynamically generated tables where they are built.


### skip-nav.js

This function automaticall binds to the `#skip-nav` and sets the proper focus when the skip-nav link is activated.


### text-resizer.js

This function sets up the increase and decrease font size buttons. Many clients like to have this functionality as a means of making the site more accessible to various users.

By default `textResizerInit();` is called in main.js on document ready.


-----------


## Custom Sass

Much like the JavaScript, the Sass (SCSS) files are also broken down by feature. Unlink the JavaScript, the Sass files are all linked through the `main.scss` file. any exclusions or additions should be done from this file.
