var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cssnano = require('gulp-cssnano');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var buildProduction = utilities.env.production;
var jshint = require('gulp-jshint');
var lib = require('bower-files')();
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('coffee', function() {
  return gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: false}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['coffee'], function(){
  return gulp.src('./build/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('clean', function(){
  return del(['build']);
});

gulp.task('build', ['clean'], function(){
  gulp.start('jade');
  gulp.start('minifyScripts');
  gulp.start('cssBuild');
});

gulp.task('jshint', function(){
  return gulp.src(['./build/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['coffee/*.coffee'], ['jsBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(["styl/*.styl"], ['cssBuild']);
});

gulp.task('jsBuild', ['jshint'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});

gulp.task('jade', ['htmlBuild'], function () {
  return gulp.src('*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('cssBuild', function () {
  return gulp.src('styl/*.styl')
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'));
});
