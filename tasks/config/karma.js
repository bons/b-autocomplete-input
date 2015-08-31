/**
 * Tests the app using jasmine
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *         https://github.com/onury/grunt-jasmine-nodejs
 */
module.exports = function(grunt)
{
  var paths = require('../paths.js');

  grunt.config.set('karma', {
    options: {
      basePath: '',
      frameworks: ['browserify', 'jasmine'],
      preprocessors:
      {
        '<%= jshint.test.src %>':[ 'browserify' ]
      },
      files : [paths.test]
    },
    dist: {
      singleRun: true,
      browsers: ['PhantomJS'],
    },
    dev: {
      autoWatch: true,
      browsers: ['Chrome', 'Firefox', 'PhantomJS']
    }
  });

  grunt.loadNpmTasks('grunt-karma');
}
