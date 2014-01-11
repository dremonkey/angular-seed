'use strict';

var
  path = require('path'),
  liveReloadPort = 35729;

/** 
 * Directory and File Path Configuration
 */

var paths = {
  
  // Client Directory and Paths
  client: {
    tld: __dirname + '/src', // directory path to top level
    dirs: {
      images: '<%= paths.client.tld %>/assets/images',
      styles: '<%= paths.client.tld %>/assets/styles',
      fonts: '<%= paths.client.tld %>/assets/fonts',
    },
    files: {
      index: '<%= paths.client.tld %>/index.html',
      scripts: ['<%= paths.client.tld %>/app/**/*.js'],
      templates: ['<%= paths.client.tld %>/app/**/*.tpl.html'], // angular templates
    }
  },

  // Server Directory
  srv: {
    tld: path.normalize(__dirname + '../../server')
  },

  // Compiled Assets Directory
  compiled: {
    tld: __dirname + '/src/.tmp' // directory path to top level
  },

  // Distribution Directory and Paths
  dist: {
    tld: __dirname + '/dist', // directory path to top level
    dirs: {
      images: '<%= paths.dist.tld %>/images',
      scripts: '<%= paths.dist.tld %>/scripts',
      styles: '<%= paths.dist.tld %>/styles',
      fonts: '<%= paths.dist.tld %>/fonts'
    }
  },

  heroku: {
    tld: path.normalize(__dirname + '../../_heroku'),
    dirs: {
      client: '<%= paths.heroku.tld %>/client'
    }
  }
};

module.exports = function (grunt) {

  /**
   * Register all Grunt Tasks
   */

  // For Heroku - task format is 'heroku:env' where env is the NODE_ENV variable
  grunt.registerTask('heroku:production', 'dist');

  // Run 'grunt dev' for live-reloading development environment
  grunt.registerTask('dev', ['build:dev', 'concurrent:dev', 'watch']);

  // Run 'grunt dist' to build and run the distribution environment
  grunt.registerTask('dist', ['build:dist', 'concurrent:dist', 'optimize']);

  // Run 'grunt heroku' to prepare the client files for deployment to heroku
  grunt.registerTask('heroku', ['dist', 'clean:heroku', 'copy:heroku']);

  // Clean, validate & compile web-accessible resources
  grunt.registerTask('build:dev', ['clean:dev', 'jshint', 'ngtemplates:dev']);
  grunt.registerTask('build:dist', ['clean:dist', 'jshint', 'copy', 'ngtemplates:dist']);

  // Optimize pre-built, web-accessible resources for production, primarily 'rev' and 'usemin'
  grunt.registerTask('optimize', ['useminPrepare', 'concat', 'ngmin', 'uglify', 'rev', 'usemin']);


  /**
   * Grunt Configurations
   */

  grunt.initConfig({

    paths: paths,

    pkg: grunt.file.readJSON('package.json'),

    banner: grunt.file.read('banner.txt'),

    // Wipe the compiled files and/or build directory
    clean: {
      options: {
        force: true // lets us delete stuff outside the current working directory
      },
      dev: {
        files: '<%= paths.compiled.tld %>'
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.compiled.tld %>/*',
            '<%= paths.dist.tld %>/*',
            '!<%= paths.dist.tld %>/.git*'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          src: '<%= paths.heroku.dirs.client %>'
        }]
      },
      ngtemplates: '<%= paths.compiled.tld %>/scripts/*.templates.js'
    },

    // Files to watch for changes in order to make the browser reload
    watch: {
      compass: {
        files: ['<%= paths.client.dirs.styles %>/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev']
      },

      dev: {
        options: {
          livereload: liveReloadPort
        },
        files: [
          '<%= paths.client.files.index %>', // client side index file
          '<%= paths.client.files.scripts %>', // client side scripts
          '<%= paths.client.dirs.images %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= paths.compiled.tld %>/scripts/{,*/}*.js', // compiled scripts
          '<%= paths.compiled.tld %>/styles/{,*/}*.css', // compiled styles

          // TODO figure out how to move this into the server directory and combine watch tasks
          // '<%= paths.srv.tld %>/api/**/*.js' // server files
        ]
      },

      // Angular templates need to be recompiled
      ngtemplates: {
        files: [
          '<%= paths.client.files.templates %>' // angular template files
        ],
        tasks: ['clean:ngtemplates', 'ngtemplates:dev']
      }
    },

    // Check javascript for errors
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= paths.client.files.scripts %>',
        '!<%= paths.client.tld %>/bower_components/**/*'
      ]
    },

    // Compass SASS -> CSS Compiler
    compass: {
      options: {
        sassDir: '<%= paths.client.dirs.styles %>',
        imagesDir: '<%= paths.client.dirs.images %>',
        fontsDir: '<%= paths.client.dirs.fonts %>',
        importPath: '<%= paths.client.tld %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dev: {
        options: {
          debugInfo: true,
          cssDir: '<%= paths.compiled.tld %>/styles',
          generatedImagesDir: '<%= paths.compiled.tld %>/images/generated'
        }
      },
      dist: {
        options: {
          cssDir: '<%= paths.dist.dirs.styles %>',
          generatedImagesDir: '<%= paths.dist.dirs.images %>/generated',
          environment: 'production'
        }
      }
    },

    // Handle cache busting for static files
    rev: {
      dist: {
        files: {
          src: [
            '<%= paths.dist.dirs.scripts %>/{,*/}*.js',
            '<%= paths.dist.dirs.styles %>/{,*/}*.css',
            '<%= paths.dist.dirs.images %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= paths.dist.dirs.fonts %>/*'
          ]
        }
      }
    },

    // Detects special construction (blocks) in the HTML files and update the grunt config to run 
    // concat/uglify/cssmin/requirejs on the files referenced in the block. Does not change the HTML.
    useminPrepare: {
      html: '<%= paths.client.files.index %>',
      options: {
        dest: '<%= paths.dist.tld %>'
      }
    },

    // Replaces references to non-optimized scripts or stylesheets in html files
    usemin: {
      html: ['<%= paths.dist.tld %>/{,*/}*.html'],
      css: ['<%= paths.dist.dirs.styles %>/{,*/}*.css'],
      options: {
        dirs: ['<%= paths.dist.tld %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.client.dirs.images %>',
          src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          dest: '<%= paths.dist.dirs.images %>'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // removeComments: true,
          // collapseWhitespace: true, //https://github.com/yeoman/grunt-usemin/issues/44
        },
        files: {
          '<%= paths.dist.tld %>/index.html': '<%= paths.client.files.index %>'
        }
      }
    },

    // Put files not handled in other tasks here
    copy: {

      // Copy app images from app -> dist
      // images: {
      //   files: [{
      //     expand: true,
      //     cwd: '<%= paths.client.tld %>',
      //     // src: 'images/{,*/}*.{png,jpg,gif,webp,svg}',
      //     src: 'assets/images/**/*.{png,jpg,gif,webp,svg}',
      //     dest: '<%= paths.dist.dirs.images %>'
      //   }]
      // },

      // Copy generated images from compiled -> dist
      generated: {
        files: [{
          cwd: '<%= paths.compiled.tld %>/images',
          src: ['generated/*'],
          dest: '<%= paths.dist.dirs.images %>',
        }]
      },

      // Copy fonts from app -> dist
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= paths.client.tld %>',
          src: 'assets/fonts/*',
          dest: '<%= paths.dist.dirs.fonts %>'
        }]
      },

      // Copy various files from app -> dist
      other: {
        files: [{
          expand: true,
          cwd: '<%= paths.client.tld %>',
          src: ['.htaccess', '*.{ico,png,txt}'],
          dest: '<%= paths.dist.tld %>'
        }]
      },

      // copy client/dist directory to heroku/client
      heroku: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist.tld %>',
          src: ['**/*'],
          dest: '<%= paths.heroku.dirs.client %>'
        }]
      }
    },

    // Tasks to run concurrently to speed up the build process
    concurrent: {
      dev: ['compass:dev'],
      test: ['compass:dev'],
      dist: ['compass:dist', 'imagemin', 'htmlmin']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    cdnify: {
      dist: {
        html: ['<%= paths.dist.tld %>/*.html']
      }
    },

    // Make all AngularJS files min safe
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist.dirs.scripts %>',
          src: '*.js',
          dest: '<%= paths.dist.dirs.scripts %>'
        }]
      }
    },

    // Concat JS files not handled by usemin and useminPrepare
    concat: {},

    // Optimize JS not handled by usemin and useminPrepare
    uglify: {},

    // Convert Angular templates to '.js'
    ngtemplates: {
      options: {
        module: {
          name: 'templates',
          define: true
        },
        base: '<%= paths.client.tld %>/app/' // template names begin after this
      },
      dev: {
        src: ['<%= paths.client.files.templates %>'],
        dest: '<%= paths.compiled.tld %>/scripts/app.templates.js'
      },
      dist: {
        src: ['<%= paths.client.files.templates %>'],
        dest: '<%= paths.dist.dirs.scripts %>/app.templates.js'
      }
    }
  });


  /**
   * Load all dev grunt task dependencies
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
