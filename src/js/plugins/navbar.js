(function ($) {
    'use strict';

    $.fn.mobileNavHeight = function () {

        var self = this,
            $navbarCollapse = $('.navbar-collapse'),
            isOpen = false;

        if ($navbarCollapse.hasClass('show')) {
            isOpen = true;
        }

        function getNavHeight () {
            var tempHeight = 0;

            $navbarCollapse.children().each(function () {
                tempHeight += $(this).outerHeight(true);
            });

            return tempHeight;
        }

        setTimeout(function () {
            var newHeight,
                parentUl;

            if (self.hasClass('navbar-toggler')) {
                // newHeight = $('.navbar-nav').not('.navbar-nav.footer').height();
                newHeight = getNavHeight();

                $navbarCollapse.css('max-height', newHeight);

                if (isOpen) {
                    $navbarCollapse.css('height', '');
                } else {
                    setTimeout(function () {
                        $navbarCollapse.css('height', newHeight);
                    }, 401);
                }
            } else {
                if (self.hasClass('sub-nav')) {
                    newHeight = self.closest('li').children('ul').height();
//                    t.closest('li').children('ul').css('border','3px solid red');
//                    console.log(t.closest('li').find('ul').first());
//                    console.log('in: ' + newHeight);
                    $navbarCollapse.css('max-height', newHeight);

                    if (isOpen) {
                        $navbarCollapse.css('height', newHeight);
                    }
                } else if (self.hasClass('sub-nav-back')) {
                    parentUl =  self.parent('ul').parent().closest('ul');

                    if (parentUl.hasClass('navbar-nav')) {
                        newHeight = getNavHeight();
                    } else {
                        newHeight = parentUl.height();
                    }

//                    t.parent('ul').parent().closest('ul').css('border','3px solid red');
//                    console.log(t.parent('ul').parent().closest('ul'));
//                    console.log('back: ' + newHeight);
                    $navbarCollapse.css('max-height', newHeight);

                    if (isOpen) {
                        $navbarCollapse.css('height', newHeight);
                    }
                }
            }
        }, 1);

        return this;
    };

    function buildNavigation () {
        var navLevel = 0,
            $navbar = $('.navbar').not('.navbar.footer'),
            $navbarToggler = $navbar.find('.navbar-toggler'),
            $navBarNav = $navbar.find('.navbar-nav'),
            $navBarNavLi = $navBarNav.find('li'),
            $navBarCollapse = $navbar.find('.navbar-collapse'),
            $navBarCollapseChildren = $navBarCollapse.children(),
            $subNavA = $navBarNav.children('li > ul > li > a'),
            $subNav,
            $subNavBack,
            hoverTimeout,
            focusOutTimeout;

        $navbarToggler.click(function () {
            if (isMobile) {
                $(this).mobileNavHeight();
            }
        });

        $navBarNavLi.on('mouseenter focusin', function () {
            var self = $(this),
                ul = self.children('ul'),
                li = ul.children('li').not('.sub-nav, .sub-nav-back'),
                ulHeight = 0;

            if (!isMobile) {
                li.each(function () {
                    ulHeight += $(this).height();
                });

                ul.height(ulHeight)
                    .addClass('active');

                setTimeout(function () {
                    if (ul.hasClass('active')) {
                        ul.css('overflow', 'visible');
                    }
                }, 301);
            }
        });

        $navBarNavLi.on('mouseleave focusout', function () {
            var ul = $(this).children('ul');

            if (!isMobile) {
                ul.removeClass('active');

                setTimeout(function () {
                    if (!ul.hasClass('active')) {
                        ul.css('overflow', 'hidden')
                            .height('');
                    }
                }, 301);
            }
        });

        $navBarNavLi.each(function () {
            var self = $(this),
                ul = self.children('ul');

            if (ul.length !== 0) {
                self.children('a').append('<span class="sub-nav">&#9654;</span>');
                ul.prepend('<li class="sub-nav-back">&#9664; Back</span>');
            }
        });

        // $subNav = $('.navbar .navbar-nav .sub-nav').not('.navbar.footer .navbar-nav .sub-nav');
        $subNav = $navBarNav.find('.sub-nav');
        $subNavBack = $navBarNav.find('.sub-nav-back');

        $subNav.click(function (event) {
            event.stopPropagation();
            event.preventDefault();

            var self = $(this),
                li = self.closest('li');

            navLevel++;
            li.siblings('li').find('ul').css('display', 'none');
            li.children('ul').css('display', 'block');
            // $navBarNav.css('left', '-' + navLevel + '00%');
            $navBarCollapseChildren.css('left', '-' + navLevel + '00%');
            if (isMobile) {
                setTimeout(function () {
                    self.mobileNavHeight();
                }, 1);
            }
        });

        $subNavBack.click(function (event) {
            event.stopPropagation();
            event.preventDefault();

            navLevel--;

            if (navLevel <= 0) {
                navLevel = 0;
                // $navBarNav.css('left', '0');
                $navBarCollapseChildren.css('left', '0');
            } else {
                // $navBarNav.css('left', '-' + navLevel + '00%');
                $navBarCollapseChildren.css('left', '-' + navLevel + '00%');
            }

            if (isMobile) {
                $(this).mobileNavHeight();
            }
        });

        $subNavA.on('focusin', function () {
            var ul = $(this).closest('ul'),
                ulHeight = 0;

            ul.parent('li').addClass('open');

            if (!isMobile) {
                ul.children('li').not('.sub-nav, .sub-nav-back').each(function () {
                    ulHeight += $(this).height();
                });
                ul.height(ulHeight);
            }
        });

        $subNavA.on('focusout', function () {
            var ul = $(this).closest('ul');

            ul.parent('li').removeClass('open');
            if (!isMobile) {
                ul.height('');
            }
        });
    }

    window.buildNavigation = buildNavigation;
}(jQuery));
