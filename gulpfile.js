var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css');

var paths = {
    sass: ['./src/scss/**/*.scss'],
};

gulp.task('default', ['sass']);

// Gulp Sass
gulp.task('sass', function (done) {
    gulp.src('src/scss/main.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./assets/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./assets/css'))
        .on('end', done);
});

//Livereload with BrowserSync
gulp.task('sync', function () {
    var files = [
        './src/scss/**/*.scss',
        './src/scss/*.scss',
        './index.html'
    ];
    browserSync.init(files, {
        browser: ["google chrome"],
        proxy: "dev.customerapp.fr"
    });
});

gulp.task('watch', ['sass', 'sync'], function () {
    gulp.watch(paths.sass, ['sass']);
});

