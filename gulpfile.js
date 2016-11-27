'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      cssmin = require('gulp-cssmin'),
      coffee = require('gulp-coffee'),
      browserSync = require('browser-sync'),
      uglify = require('gulp-uglify'),
      connect = require('gulp-connect'),
      rigger = require('gulp-rigger');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./app/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

//html
gulp.task('html', function(){
    return gulp.src('_html/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('app/'))
        .pipe( browserSync.reload({stream:true}) );
});

//commonCss
gulp.task('commonCss', function(){
    return gulp.src('libs/**/*.css')
        .pipe(concat('common.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
});

//css
gulp.task('css', function(){
    return gulp.src('_sass/main.sass')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe( browserSync.reload({stream:true}) );
});

//commonJs
gulp.task('commonJs', function(){
    return gulp.src(['libs/jquery/jquery.min.js', 'libs/**/*.js'])
        .pipe(concat('common.js'))
        /*.pipe(uglify())*/
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
});

//js
gulp.task('js', function(){
    return gulp.src('_coffee/main.coffee')
        .pipe(coffee())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
        .pipe( browserSync.reload({stream:true}) );
});

gulp.task('watch', function(){
    gulp.watch('_sass/**/*.*', gulp.series('css'))
    gulp.watch('libs/**/*.css', gulp.series('commonCss'))
    gulp.watch('_coffee/**/*.*', gulp.series('js'))
    gulp.watch('_html/**/*.html', gulp.series('html'))
})

gulp.task('build', gulp.parallel('commonCss', 'commonJs', 'js', 'css', 'html'));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'browserSync')));