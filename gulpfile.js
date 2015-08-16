'use strict';

var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint  = require('gulp-jshint');
var ignore  = require('gulp-ignore');
var del     = require('del');
var babel   = require('gulp-babel');
var shell   = require('gulp-shell');
var runSequence = require('run-sequence');

gulp.task('start-server', function() {
  return nodemon({
    script: 'build/server/portfolio.js',
    ext: 'js html',
    env: {'ENV': 'development'}
  });
});


// TODO: Figure out how to run webpack server from gulp
// for now, use npm scripts
//gulp.task('dev-server', function() {});

gulp.task('clean', function(cb) {
  del([
    'build/'
  ], cb);
});

gulp.task('build', function(cb) {
  return gulp.src('./src/**/*')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

// FIXME: Doesn't work for some reason...
gulp.task('env-setup', shell.task([
  'source dev-env.sh'
]));

// task to lint JS files
gulp.task('lint', function() {
  return gulp.src(['./src/client/**/*.js', './src/server/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(ignore.exclude('**/*.test.js'))
    .pipe(jshint.reporter('default'));
});

gulp.task('start', function(cb) {
  runSequence(['env-setup', 'dev-server', 'start-server'], cb);
});
