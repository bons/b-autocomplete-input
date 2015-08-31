/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * # gruntfile task config
 * Watch for change in paths.grunt and run the syntax checker
 *
 * # app task config
 * Watch for change in paths.app, run the syntax checker and jasmine tests
 *
 * # test task config
 * Watch for change in paths.test, run the syntax checker and jasmine tests
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = function(grunt)
{
  var paths = require('../paths.js');

  grunt.config.set('watch', {
    jshint: {
      files: ['<%= jshint.lib.src %>','<%= jshint.test.src %>'],
      options: {
        spawn: false,
      },
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
}
