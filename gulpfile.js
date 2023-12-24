'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS  = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const typescript = require('gulp-typescript');
require('gulp-watch');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

//sassコンパイル
gulp.task('sass', () => {
    return gulp.src('app/css/customize.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({extname: '.min.css'}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://localhost/collatz_visualization',
        port: 3011,
    });
});

// tsをコンパイル
gulp.task('ts',  () => {
    return gulp.src('app/ts/customize.ts')
        .pipe(plumber())
        .pipe(typescript())
        .js
        .pipe(gulp.dest('app/js'));
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
	gulp.watch('app/css/customize.scss', gulp.task('sass'));
    gulp.watch('app/index.html', gulp.task('reload'));
    gulp.watch(['./app/ts/*.js'], gulp.task('ts'));
    gulp.watch(['./app/js/*.js', '!./app/js/*.min.js'], gulp.task('js-minify'));
});

gulp.task('deploy', gulp.series(gulp.parallel('sass','ts'),'js-minify'));

//デフォルト
gulp.task('default', gulp.series('deploy', gulp.parallel('browser-sync','watch')));