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

    less: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src/style/less',
          src: '**/*.less',
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

    svgmin: {
      options: {
        plugins: []
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'svg/ink',
          src: '*.svg',
          dest: 'svg/svg-opt'
        }]
      }
    },

    svgstore: {
      default: {
        files: {
          'build/defs.svg': ['svg/svg-opt/*.svg']
        }
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'svg-replace',
              replacement: function() {
                return grunt.file.read('build/defs.svg');
              }
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['build/aimbot.html'],
            dest: 'build/'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true,
        atBegin: true
      },
      client: {
        files: ['src/**/*.js'],
        tasks:  ['uglify']
      },
      styles: {
        files: ['src/style/less/**/*.less'],
        tasks: ['less']
      },
      markup: {
        files: ['src/**/*.html', 'svg/ink/*'],
        tasks: ['copy', 'svgmin', 'svgstore', 'replace']
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-replace');

  // register tasks
  grunt.registerTask('serve', ['watch']);
};