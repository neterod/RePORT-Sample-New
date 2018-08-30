(function () {
    'use strict';

    var gulp  = require('gulp'),
        uglify  = require('gulp-uglify'),

        // TODO: remove less
        less  = require('gulp-less'),
        lessReporter = require('gulp-csslint-less-reporter'),

        sass = require('gulp-sass'),

        shell  = require('gulp-shell'),

        csslint = require('gulp-csslint'),
        browserSync = require('browser-sync').create(),
        htmlmin = require('gulp-htmlmin'),
        jshint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        notify = require('gulp-notify'),
        nunjucks = require('gulp-nunjucks'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        whitespace = require('gulp-whitespace'),

        //new
        cached = require('gulp-cached'),
        remember = require('gulp-remember'),

        srcDir = 'src/',
        distDir = 'dist/',
        distJS = distDir + 'js/',

        //isWin = /^win/.test(process.platform),
        //proxy = isWin ? 'http://localhost:2929' : 'http://localwindows:2929',

        /* jQuery library */
        jQuerySrc = [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/flexslider/jquery.flexslider-min.js'
        ],
        jQueryDest = distJS,
        jQueryLibFile = 'jquery.min.js',


        /* Bootstrap 4 libraries */
        libBSDir = 'node_modules/bootstrap/',
        libBSSrc = [
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            libBSDir + 'js/dist/alert.js',
            libBSDir + 'js/dist/button.js',
            // Bootstrap carousel replaced by flexslider
            // libBSDir + 'js/dist/carousel.js',
            libBSDir + 'js/dist/collapse.js',
            libBSDir + 'js/dist/dropdown.js',
            libBSDir + 'js/dist/modal.js',
            libBSDir + 'js/dist/tooltip.js',
            libBSDir + 'js/dist/popover.js',
            libBSDir + 'js/dist/scrollspy.js',
            libBSDir + 'js/dist/tab.js',
            libBSDir + 'js/dist/util.js'
        ],
        libBSDest = distJS,
        libBSFile = 'bootstrap.min.js',

        /* other libraries */
//        libSrc = [
//            srcDir + 'js/file.js'
//        ],
//        libDest = '../js/',
//        libFile = 'lib.min.js',

        /* javascript files */
        jsSrc  = [
            srcDir + 'js/plugins/average-bg-image-color.js',
            srcDir + 'js/plugins/back-to-top.js',
            srcDir + 'js/plugins/break-long-urls.js',
            srcDir + 'js/plugins/convert-svg-inline.js',
            srcDir + 'js/plugins/file-reader-downloads.js',
            srcDir + 'js/plugins/mobile-check.js',
            srcDir + 'js/plugins/navbar.js',
            srcDir + 'js/plugins/parallax.js',
            srcDir + 'js/plugins/responsive-tables.js',
            srcDir + 'js/plugins/skip-nav.js',
            srcDir + 'js/plugins/text-resizer.js',
            srcDir + 'js/main.js'
        ],
        jsDest = distJS,
        jsLintSrc = [
            srcDir + 'js/main.js'
        ],

        /* CSS */
        libBSDirSCSS = libBSDir + 'scss/',
        scssBootstrapSrc = srcDir + 'scss/',
        scssSrc = srcDir + 'scss/main.scss',
        cssDest = distDir + 'css/';


    gulp.task('compresslibraries', function () {

        /* jQuery */
        gulp.src(jQuerySrc)
            .pipe(concat(jQueryLibFile))
            .pipe(uglify())
            .pipe(gulp.dest(jQueryDest));

        /* Boostrap */
        gulp.src(libBSSrc)
            .pipe(concat(libBSFile))
            .pipe(uglify())
            // .pipe(uglify({
            //     mangle: false
            // }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(libBSDest));

        /* IE */
        // gulp.src(libIESrc)
        //     .pipe(concat(libIEFile))
        //     .pipe(uglify())
        //     .pipe(gulp.dest(libIEDest));

        /* Other libraries */
//        gulp.src(libSrc)
//            .pipe(concat(libFile))
//            .pipe(uglify())
//            .pipe(gulp.dest(libDest));
    });

    gulp.task('compressjs', ['lint', 'jscs'], function () {

        gulp.src(jsSrc)
            .pipe(sourcemaps.init())
            .pipe(remember('compressfiles'))
            .pipe(concat('main.min.js'))
            .pipe(uglify({
                mangle: false
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsDest));
    });


    gulp.task('compileimages', function () {
        return gulp.src(srcDir + 'images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'));
    });


    /*
    ** jscs and lint have to be on different task
    * in order to break the build of one of them fail
    * *** We can't cache jscs because cached checks for content change, not spaces
    */

    gulp.task('jscs', function () {
        return gulp.src(jsLintSrc)
//            .pipe(cached('jscsfiles'))
            .pipe(whitespace({
                removeTrailing: true
            }))
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(jscs.reporter('fail'))
            .on('error', notify.onError({
                message: 'JSCS failed.'
            }));
    });

    gulp.task('lint', function () {
        return gulp.src(jsLintSrc)
//            .pipe(cached('lintfiles'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
            .on('error', notify.onError({
                message: 'JSHint failed.'
            }));
    });

    gulp.task('compilecss', function () {
        return gulp.src(scssSrc)
        .pipe(csslint(srcDir + 'scss/.csslintrc'))
        .pipe(remember('scssfiles'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDest));
            // .pipe(remember('lessfiles'))
            // .pipe(sourcemaps.init())
            // .pipe(rename('main.min.css'))
            // .pipe(less({
            //     compress: true
            // }))
            // .pipe(csslint(srcDir + 'less/.csslintrc'))
            // .pipe(lessReporter())
            // .pipe(sourcemaps.write('./'))
            // .pipe(gulp.dest(cssDest));
    });

    gulp.task('compileSCSSBootstrap', function () {
        return gulp.src(scssBootstrapSrc + 'bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest(cssDest));
    });

    gulp.task('minifyhtml', function () {
        return gulp.src(srcDir + '*.html')
            .pipe(nunjucks.compile())
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(distDir));
    });

    // gulp.task('buildStyleGuide', shell.task([
    //     'node_modules/.bin/kss --config <%= config %>'
    //   ],
    //   {
    //     templateData: {
    //       config: 'src/styleguide/kss/kss-config.json'
    //     }
    // }));

    gulp.task('server', [], function () {
        cached.caches = {};
        browserSync.init({
            server: {
                baseDir: distDir
            },
            open: false
        });

        browserSync.watch(cssDest + '*.css', function (event, file) {
            if (event === 'change') {
                browserSync.reload(cssDest + '*.css');
            }
        });

        gulp.watch('../src/scss/*.scss', ['compilecss'/*, 'buildStyleGuide'*/]);
        // gulp.watch('../src/styleguide/*.html', ['buildStyleGuide']);

        gulp.watch(srcDir + 'scss/*.scss', ['compilecss']);
//        gulp.watch(srcDir + 'less/bootstrap/**/*.less', ['compileSCSSBootstrap']);
        gulp.watch(jsSrc, ['jscs', 'lint', 'compressjs']);
        gulp.watch(srcDir + '**/*.html', ['minifyhtml']);

        gulp.watch([distDir + '*.html', jsDest + '*.js']).on('change', browserSync.reload);

    });

    gulp.task('build', [
       'compileSCSSBootstrap',
       'compresslibraries',

       'jscs',
       'compileimages',
       'compressjs',
       'compilecss',
       'minifyhtml',
    //    'buildStyleGuide'
    ]);

    gulp.task('default', [
        'server',
        'jscs',
        'compileimages',
        'compressjs',
        'compilecss',
        'minifyhtml',
        // 'buildStyleGuide'
    ]);
}());


