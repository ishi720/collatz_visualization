'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
require('gulp-watch');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://localhost/collatz_visualization',
        port: 3011,
    });
});

//jsをminfyする
gulp.task('js-minify', () => {
    return gulp.src(['./app/js/*.js', '!./app/js/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./app/js/'))
        .pipe(browserSync.stream());
});

//ファイル監視
gulp.task('watch', () => {
    gulp.watch('app/index.html', gulp.task('reload'));
    gulp.watch(['./app/js/*.js', '!./app/js/*.min.js'], gulp.task('js-minify'));
});

gulp.task('deploy', gulp.series(gulp.parallel('js-minify')));

//デフォルト
gulp.task('default', gulp.series('deploy', gulp.parallel('browser-sync','watch')));