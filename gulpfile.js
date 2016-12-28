'use strict';

var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');
var testPipeline = require('pipeline-test-node');

var config = {
  jsFiles: [
    './*.js',
    'src/**/*.js',
    'test/**/*.js'
  ]
};

gulp.task('test', ['lint'], function() {
  return gulp
    .src(config.jsFiles)
    .pipe(testPipeline.test());
});

gulp.task('lint', function() {
  return gulp
    .src(config.jsFiles)
    .pipe(validatePipeline.validateJS());
});

gulp.task('build', ['test']);