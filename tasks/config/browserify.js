/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 *
 * For usage docs see:
 *        https://github.com/jmreidy/grunt-browserify
 */
module.exports = function(grunt)
{
  var paths = require('../paths');

  grunt.config.set('browserify',
  {
    options: {
      banner: '<%= banner %>',
      external: ['angular'],
    },
    dist: {
      src: paths.lib,
      dest: paths.dist
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
