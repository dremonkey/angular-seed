'use strict';

var
  path = require('path'),
  liveReloadPort = 35720;

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

  // Compiled Assets Directory
  compiled: {
    tld: __dirname + '/.tmp' // directory path to top level
  },

  test: {
    tld: __dirname + '/test' // directory path to top level
  },

  // Distribution Directory and Paths
  dist: {
    tld: __dirname + '/dist', // directory path to top level
    dirs: {
      images: '<%= paths.dist.tld %>/images',
      scripts: '<%= paths.dist.tld %>/scripts',
      styles: '<%= paths.dist.tld %>/styles',
      fonts: '<%= paths.dist.tld %>/fonts'
    },
    files: {
      templates: ['<%= paths.dist.tld %>/app/**/*.tpl.html'], // angular templates
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

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


  /**
   * Define the configuration for all the tasks
   */
  grunt.initConfig({

    paths: paths,

    // Files to watch for changes in order to make the browser reload
    watch: {
      js: {
        options: {
          livereload: liveReloadPort
        },
        files: [
          '<%= paths.client.files.scripts %>', // app scripts
          '<%= paths.compiled.tld %>/scripts/{,*/}*.js', // compiled scripts
        ],
        tasks: ['newer:jshint:all'],
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= paths.client.dirs.styles %>/{,*/}*.{scss,sass}'],
        tasks: ['compass:server'],
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: liveReloadPort
        },
        files: [
          '<%= paths.client.files.index %>', // client side index file
          '<%= paths.client.dirs.images %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= paths.compiled.tld %>/styles/{,*/}*.css', // compiled styles
        ]
      },
      // recompile angular templates
      ngtemplates: {
        files: ['<%= paths.client.files.templates %>'],
        tasks: ['clean:ngtemplates', 'ngtemplates:server']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: liveReloadPort
      },
      livereload: {
        options: {
          open: true,
          base: [
            // Directories to serve static files from
            '<%= paths.compiled.tld %>',
            '<%= paths.client.tld %>',
            '<%= paths.client.tld %>/assets'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            // Directories to serve static files from
            '<%= paths.compiled.tld %>',
            '<%= paths.test.tld %>',
            '<%= paths.client.tld %>',
            '<%= paths.client.tld %>/assets'
          ]
        }
      },
      dist: {
        options: {
          // Directories to serve static files from
          base: '<%= paths.dist.tld %>'
        }
      }
    },

    // Check javascript for errors
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= paths.client.files.scripts %>',
        '!<%= paths.client.tld %>/components/**/*'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        force: true // lets us delete stuff outside the current working directory
      },
      server: {
        files: '<%= paths.compiled.tld %>'
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.compiled.tld %>/*',
            '<%= paths.dist.tld %>/*'
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

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.compiled.tld %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= paths.compiled.tld %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= paths.client.files.index %>',
        ignorePath: 'src/',
      }
    },

    // Compass SASS -> CSS Compiler
    compass: {
      options: {
        sassDir: '<%= paths.client.dirs.styles %>',
        imagesDir: '<%= paths.client.dirs.images %>',
        fontsDir: '<%= paths.client.dirs.fonts %>',
        importPath: '<%= paths.client.tld %>/components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        // raw: 'Sass::Script::Number.precision = 10\n'
      },
      server: {
        options: {
          debugInfo: true,
          cssDir: '<%= paths.compiled.tld %>/styles',
          generatedImagesDir: '<%= paths.compiled.tld %>/images/generated'
        }
      },
      dist: {
        options: {
          // cssDir: '<%= paths.dist.dirs.styles %>',
          cssDir: '<%= paths.compiled.tld %>/styles',
          generatedImagesDir: '<%= paths.dist.dirs.images %>/generated',
          environment: 'production'
        }
      }
    },

    // Handle cache busting for static files
    rev: {
      images: '<%= paths.dist.dirs.images %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      js: '<%= paths.dist.dirs.scripts %>/{,*/}*.js',
      css: '<%= paths.dist.tld %>/styles/{,*/}*.css',
      other: '<%= paths.dist.dirs.fonts %>/*'
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them. Does not change the HTML.
    useminPrepare: {
      html: '<%= paths.client.files.index %>',
      options: {
        dest: '<%= paths.dist.tld %>',
        staging: '<%= paths.compiled.tld %>'
      }
    },

    // Replaces references to non-optimized scripts or stylesheets in html files
    // based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          // List of directories to look for revved version of the assets referenced in the currently looked at file.
          '<%= paths.dist.tld %>'
        ],
        patterns: {
          js: [[/(images\/\w+\.(png|jpg|jpeg|gif|webp|svg))/, 'Replacing reference to images in js files']]
        }
      },
      html: [
        '<%= paths.dist.tld %>/{,*/}*.html',
        // '<%= paths.dist.tld %>/app/**/*.tpl.html',
      ],
      css: [
        '<%= paths.dist.dirs.styles %>/*.css'
        // '<%= paths.compiled.tld %>/styles/{,*}/*.css'
      ],
      js: [
        '<%= paths.dist.dirs.scripts %>/*.templates.js'
      ]
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.client.dirs.images %>',
          src: '{,*/}*.{png,jpg,jpeg,gif,webp}',
          dest: '<%= paths.dist.dirs.images %>'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.client.dirs.images %>',
          src: '{,*/}*.svg',
          dest: '<%= paths.dist.dirs.images %>'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          collapseBooleanAttributes: true,
          removeOptionalTags: true,
          // collapseWhitespace: true
        },
        files: {
          '<%= paths.dist.tld %>/index.html': '<%= paths.client.tld %>/index.html'
        }
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      compiled: {
        files: [{
          expand: true,
          cwd: '<%= paths.compiled.tld %>/concat/scripts',
          src: [
            // List of files that need to be made min-safe
            // Should probably only be your app files
            'app.concat.js'
          ],
          dest: '<%= paths.compiled.tld %>/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= paths.dist.tld %>/*.html']
      }
    },

    // Put files not handled in other tasks here
    copy: {

      dist: {
        files: [

          // Copy fonts from app -> dist          
          {
            expand: true,
            cwd: '<%= paths.client.tld %>/assets/fonts',
            src: '*.{woff,svg,eot,ttf}',
            dest: '<%= paths.dist.dirs.fonts %>'
          },

          // Copy ng-templates from app -> dist/app
          // {
          //   expand: true,
          //   cwd: '<%= paths.client.tld %>/app',
          //   src: '**/*.tpl.html',
          //   dest: '<%= paths.dist.tld %>/app'
          // },

          // Copy video files from app -> dist
          {
            expand: true,
            cwd: '<%= paths.client.dirs.videos %>/',
            src: '*.{mp4,webm}',
            dest: '<%= paths.dist.dirs.videos %>'
          },

          // Copy various files from app -> dist
          {
            expand: true,
            cwd: '<%= paths.client.tld %>',
            src: ['.htaccess', '*.{ico,png,txt}'],
            dest: '<%= paths.dist.tld %>'
          },

          // Copy various vendor files from app -> dist
          {
            expand: true,
            cwd: '<%= paths.client.tld %>/vendor',
            src: '**/*.swf',
            dest: '<%= paths.dist.tld %>/vendor'
          }
        ]
      },

      // Copy dist directory to heroku/client
      heroku: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist.tld %>',
          src: [
            '**/*',
            '!app/*'
          ],
          dest: '<%= paths.heroku.dirs.client %>'
        }]
      }
    },

    // Tasks to run concurrently to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass:server'
      ],
      dist: [
        // 'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options can be used if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= paths.dist.tld %>/styles/main.css': [
    //         '<%= paths.compiled.tld %>/styles/{,*/}*.css',
    //       ]
    //     }
    //   }
    // },

    // Optimize JS not handled by usemin and useminPrepare
    uglify: {
      templates: {
        files: {
          '<%= paths.dist.dirs.scripts %>/app.templates.js' : '<%= paths.dist.dirs.scripts %>/app.templates.js'
        }
      }
    },

    // concat: {
    //   dist: {}
    // },

    // Convert Angular templates to '.js'
    ngtemplates: {
      options: {
        module: 'particle.templates', //  needs to match the name of an existing angular module
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true, // Only if you don't use comment directives!
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      server: {
        cwd: '<%= paths.client.tld %>/app',
        src: ['**/*.tpl.html'],
        dest: '<%= paths.compiled.tld %>/scripts/app.templates.js'
      },
      dist: {
        cwd: '<%= paths.client.tld %>/app',
        src: ['**/*.tpl.html'],
        dest: '<%= paths.dist.dirs.scripts %>/app.templates.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
  });


  /**
   * Register all Grunt Tasks
   */

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'ngtemplates:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'ngtemplates:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'copy:dist',
    'compass:dist',
    'concurrent:dist',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'ngtemplates:dist',
    'ngmin', // needs to be after concat
    'cdnify',
    'cssmin',
    'htmlmin',
    'uglify',
    'rev',
    'usemin', // run last
  ]);

  grunt.registerTask('dist', [
    'newer:jshint',
    // 'test', // temporarily disabled until tests are made
    'build'
  ]);

  grunt.registerTask('heroku', [
    'dist',
    'clean:heroku',
    'copy:heroku'
  ]);
};
