module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    clean: ['app/dev'],

    uglify: {
      dev: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          'build/aimbot.min.js': [
            'src/*.js', 'src/*/*.js'
          ]
        }
      }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src/style/scss',
          src: '**/*.scss',
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.html',
          dest: 'build'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      client: {
        files: ['src/**/*.js'],
        tasks:  ['uglify']
      },
      styles: {
        files: ['src/style/scss/**/*.less'],
        tasks: ['sass']
      },
      markup: {
        files: ['src/**/*.html'],
        tasks: ['copy']
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register tasks
  grunt.registerTask('serve', ['uglify', 'sass', 'copy', 'watch']);
};