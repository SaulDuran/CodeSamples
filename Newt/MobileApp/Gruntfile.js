'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');


var argv = require('yargs').argv
var fs = require('fs');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,

      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8051,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/',
      },

      start: {
        keepAlive: true,
      }
    },

    connect: {
      options: {
        port: 8051
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          },
          {
              flatten: true,
              expand: true,
              src: ['<%= pkg.src %>/images/devices/*'],
              dest: '<%= pkg.dist %>/images/devices/'
            },
            {
                flatten: true,
                expand: true,
                src: ['<%= pkg.src %>/images/avatars/*'],
                dest: '<%= pkg.dist %>/images/avatars/'
              },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/assets/*'],
            dest: '<%= pkg.dist %>/assets/'
          },
        ]
      }
    },
    'string-replace': {
    	inline: {
    		files: {
                '<%= pkg.dist %>/index.html':'<%= pkg.src %>/index.html'
    		},
    		options: {
    			replacements: [
	               // place files inline example
	               {
	            	   pattern: '<script type="text/javascript" src="assets/main.js"></script>',
	            	   replacement: '<script type="text/javascript" src="main.js"></script>'
	               }
               ]
    		}
    	}
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    }
  });

  grunt.registerTask('define-env', function() {
    fs.writeFileSync('app/scripts/env-config.js', 'module.exports = { env : "' + argv.env + '"};');
  });

  grunt.registerTask('serve', function (target) {
    //grunt.task.run(['define-env']);
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'copy', 'webpack','string-replace']);

  grunt.registerTask('default', []);
};
