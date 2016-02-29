var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cssnano = require('gulp-cssnano');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

gulp.task('jade', function () {
  return gulp.src('*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: false
    }))
    .pipe(gulp.dest('build/'))
})

gulp.task('stylus', function () {
  return gulp.src('*.styl')
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(gulp.dest('build/'));
});

gulp.task('coffee', function() {
  return gulp.src('*.coffee')
    .pipe(coffee({bare: false}).on('error', gutil.log))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});
