module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
            },
            dist: {
                files: {
                    'css/main-prefixed.css': 'css/main.css'
                }
            }
        },

        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'nested'
                },
                files: { // Dictionary of files
                    'css/main.css': 'css/main.scss', // 'destination': 'source'
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/* Adam Menczykowski Boilerplate CSS*/'
                },
                files: {
                    'css/main.min.css': ['css/main-prefixed.css']
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'js/*.js']
        },


        uglify: {
            options: {
                mangle: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                preserveComments: 'some'
            },
            pluginsjs: {
                files: {
                    'js/plugins.min.js': ['js/plugins.js']
                }
            },
            mainjs: {
                files: {
                    'js/main.min.js': ['js/main.js']
                }
            }
        },
        connect: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: '.',
                    livereload: true

                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        },
        watch: {
            gfile: {
                files: 'Gruntfile.js',
                options: {
                    reload: true
                }
            },
            scripts: {
                files: 'js/*.js',
                tasks: ['jshint'],
                options: {
                    livereload: true
                },
            },
            styles: {
                files: '**/*.scss',
                tasks: 'default',
                options: {
                    livereload: true
                },
            },
            markup: {
                files: ['index.html', '**/*.html'],
                options: {
                    livereload: true
                },
            }
        },

    });




    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-open');

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.loadNpmTasks('grunt-contrib-watch');




    // Default task(s).
    grunt.registerTask('default', ['sass', 'autoprefixer']);
    grunt.registerTask('server', ['open', 'connect', 'watch']);
};
