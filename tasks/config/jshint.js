/**
 * Checks javascript syntax
 *
 * ---------------------------------------------------------------
 *
 * # gruntfile task config
 * Checks the syntax of paths.grunt
 *
 * # app task config
 * Checks the syntax of paths.app
 *
 * # test task config
 * Checks the syntax of paths.test
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function(grunt)
{
  var paths = require('../paths.js');

  grunt.config.set('jshint', {
    options: {
      jshintrc: './.jshintrc'
    },
    gruntfile: {
      src: paths.grunt
    },
    lib: {
      src: paths.lib
    },
    test: {
      src: paths.test
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
}
