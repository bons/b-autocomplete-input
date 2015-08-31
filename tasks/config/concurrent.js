/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 *
 * For usage docs see:
 *        https://github.com/sindresorhus/grunt-concurrent
 */
module.exports = function(grunt)
{
  var paths = require('../paths');

  grunt.config.set('concurrent',
  {
    options: {
      logConcurrentOutput: true
    },
    dev: {
      tasks: ['jshint', 'karma:dev', 'watch:jshint']
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
};
