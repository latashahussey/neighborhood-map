var gulp = require('gulp'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-clean-css'),
  minifyJS = require('gulp-uglify'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  paths = {
    cssSrc: 'src/css/',
    cssDest: 'dist/css/',
    jsSrc: 'src/js/',
    jsDest: 'dist/js/'
  },
  watch = require('gulp-watch');


/* GULP TASKS */

//Check gulpfile for errors
gulp.task('jshint', function() {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//Grab all css files then minify, merge, and move  them to destination
gulp.task('minifyCSS', function() {
  gulp.src(paths.cssSrc + '*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.cssDest));
});

//Grab all js files then minify, merge, and move  them to destination
gulp.task('minifyJS', function() {
  gulp.src(paths.jsSrc + '*.js')
    .pipe(minifyJS())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.jsDest));
});


//Watch for css or changes to images, then run tasks
gulp.task('watch', function() {
  // Endless stream mode
  gulp.watch(paths.cssSrc + '**/*.css', ['minifyCSS']);
  gulp.watch(paths.jsSrc + '**/*.js', ['minifyJS']);
});

//Run all gulp tasks
gulp.task('default', ['jshint', 'minifyCSS', 'minifyJS','watch']);
