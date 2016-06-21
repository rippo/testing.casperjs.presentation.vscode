module.exports = function (grunt) {

    grunt.initConfig({

        express: {
            all: {
                options: {
                    bases: ['d:\\Projects\\Presentations\\testing.casperjs.presentation.vscode'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        watch: {
            files: ['index.html'],
            /*tasks: 'reload'*/
            options: {
                livereload: true
            }
        },

        open: {
            all: {
                path: 'http://localhost:8080/index.html'
            }
        }

    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server', ['express', 'open', 'watch']);
};