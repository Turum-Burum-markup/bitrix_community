module.exports = function(grunt) {

    // All settings are here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js', // JS in folder libs
                    'js/main.js'  // file
                ],
                dest: 'dist/js/production.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/js/production.js',
                dest: 'dist/js/production.min.js'
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.png'],
                        dest: 'dist/img/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**/*.jpg'],
                        dest: 'dist/img/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        less: {
            options: {
                spawn: true
            },
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 3
                },
                files: {
                    "dist/css/all.css": "less/all.less" // destination file and source file
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },

            less: {
                files: ['less/**/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    spawn: false
                }
            },

            imagemin: {
                files: ['**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                    event: ['added', 'changed']
                }
            }
        },
        autoprefixer: {

            options: {
                browsers: ['Chrome > 25', 'Firefox > 25', 'ie >= 9','Safari > 6', 'ios_saf 7']
            },
            dist: {
                diff: false,
                expand: true,
                flatten: true,
                files: {
                    'dist/css/all.css': 'dist/css/all.css'
                }
            }
        }
    });

    // Using the plagins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default tasks
    grunt.registerTask('default', [ 'autoprefixer', 'concat', 'uglify', 'less', 'imagemin', 'watch']);

};