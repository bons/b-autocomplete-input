/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 *         https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt)
{
  var paths = require('../paths');
  grunt.config.set('uglify',
  {
    dist: {
        src: [paths.dist],
        dest: paths.dist.replace('<%= pkg.name %>','<%= pkg.name %>.min')
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
