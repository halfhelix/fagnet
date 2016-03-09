var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee'),
    deploy = require('gulp-gh-pages'),
    include = require('gulp-include'),
    neat = require('node-neat').includePaths,
    sass = require('gulp-ruby-sass'),
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    html: './*.haml',
    coffee: './assets/js/**/*.coffee',
    js: './assets/js/**/*.js',
    scss: './assets/stylesheets/**/*.scss',
    images: './assets/images/*',
    fonts: './assets/fonts/**/*.*',
    mainScss: './assets/stylesheets/main.scss'
};

// Scss stylesheets
gulp.task('stylesheets', function() {
    return gulp.src(paths.scss)
        .pipe(sass({
            loadPath: [paths.mainScss].concat(neat),
            "sourcemap=none": true
        }))
        .pipe(autoprefixer())
        .pipe(cssmin())
        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('./build/stylesheets'));
});

// Coffeescript
gulp.task('cofee', function() {
    return gulp.src(paths.coffee)
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(coffee())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/js'));
});

gulp.task('javascript', function() {
    return gulp.src(paths.js)
        //.pipe(concat('script.js'))
        .pipe(gulp.dest('./build/js'));
});

coffeeStream = coffee({
    bare: true
});
coffeeStream.on('error', function(err) {});

// Copy images
gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(gulp.dest('./build/images'));
});

// Copy fonts
gulp.task('fonts', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./build/fonts'));
});

// Server
gulp.task('server', function() {
    browsersync({
        server: {
            baseDir: "./",
        },
        port: 4000,
        notify: false,
        open: true
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.html, ['views']);
    gulp.watch(paths.scss, ['stylesheets']);
    gulp.watch(paths.coffee, ['cofee']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.js, ['javascript']);
    gulp.watch('./*.html', browsersync.reload);
    gulp.watch('./build/stylesheets/*.css', browsersync.reload);
    gulp.watch('./build/js/*.js', browsersync.reload);
    gulp.watch('./build/images/*', browsersync.reload);
    gulp.watch('./build/fonts/*', browsersync.reload);
    gulp.watch('./build/js/*', browsersync.reload);

});

// Run
gulp.task('default', ['stylesheets', 'cofee', 'images', 'fonts', 'javascript', 'server', 'watch'], function() {

});

// Deploy
gulp.task('deploy', function() {
    return gulp.src("./build/**/*")
        .pipe(deploy({
            branch: "master"
        }));
});