/*
 * grunt-slim-php
 * https://github.com/clthck/grunt-slim-php
 *
 * Copyright (c) 2015 clthck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    slimphp: {
      basic_html: {
        options: {
        },
        files: {
          'tmp/basic.html': ['test/fixtures/basic.slim'],
        },
      },
      invalid: {
        options: {
          writeError: false,
        },
        files: {
          'tmp/invalid.html': ['test/fixtures/invalid.slim'],
        },
      },
      php_code: {
        files: {
          'tmp/php_code.php': ['test/fixtures/php_code.slim'],
        },
      },
      invalidWrite: {
        files: {
          'tmp/invalidWrite.html': ['test/fixtures/invalid.slim'],
        },
      },
      unknownFilter: {
        files: {
          'tmp/unknown_filter.html': ['test/fixtures/unknown_filter.slim']
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'slimphp', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
