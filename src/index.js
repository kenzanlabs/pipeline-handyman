/* global require, module */
'use strict';

var _ = require('lodash');
var del = require('del');
var fs = require('fs');
var util = require('gulp-util');

module.exports = {
  cleanSync: cleanSync,
  getPackageName: getPackageName,
  log: log,
  mergeConfig: mergeConfig,
  slugify: slugify
};

function cleanSync(path, options) {
  return del.sync(path, options);
}

function mergeConfig(config, newConfig) {
  return _.merge({}, config, newConfig, replaceArrays);
}

function replaceArrays(a, b) {
  if (_.isArray(a)) {
    return b;
  }
}

function log(msg) {
  var item;

  if (typeof msg === 'object') {
    for (item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}

function getPackageName() {
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));

  return packageJson.name;
}

function slugify(input) {
  return input
    .replace(/(\s*[\W]\s*)\s?/g, '-')
    .toLowerCase();
}