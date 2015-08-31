module.exports = function(grunt)
{
  grunt.registerTask('dist', ['jshint', 'browserify', 'uglify']);
}
