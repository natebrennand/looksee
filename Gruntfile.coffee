
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    clean:
      src:
        ['generated']

    concat:
      js:
        src:  ['static/lib/*.js', 'static/js/**/*.js']
        dest: 'generated/app.js'

    ngmin:
      deploy:
        src:  ['generated/app.js']
        dest: 'generated/app.ngmin.js'
      dev:
        src:  ['generated/app.js']
        dest: 'static/jsmin/app.js'

    uglify:
      deploy:
        src:  'generated/app.ngmin.js'
        dest: 'static/jsmin/app.min.js'

    watch:
      scripts:
        files:
          ['static/js/**/*.js']
        tasks:
          ['default']
        options:
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-ngmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'style', ['sass']
  grunt.registerTask 'default', ['build', 'clean']
  grunt.registerTask 'build', ['concat', 'ngmin', 'uglify']
  grunt.registerTask 'noSass', ['concat', 'ngmin', 'uglify']
