'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');

// Очищаем папку build перед сборкой
gulp.task('clean', function() {
  return del('build');
});

// Копируем в папку build
gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

// CSS
gulp.task('style', function() {
  gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 5 versions'
      ]})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
});

// JS
gulp.task('js', function(){
  return gulp.src('js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'))
});

// Images
gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

// Сборка проекта
gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'js',
    fn
  );
});

// Копируем html в build
gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

// Обновляем страничку в браузере после копирования html
gulp.task('html:update', ['html:copy'], function(done) {
  browserSync.reload();
  done();
});

// Browser Sync
gulp.task('serve', function() {
  browserSync.init({
    server: 'build/'
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('*.html', ['html:update']);
});
