module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    shell: {
      bundle: {
        options: { stdout: true },
        command: 'bundle'
      },
      jasmine: {
        options: { stdout: true },
        command: 'jasmine init'
      },
      removeHelpers: {
        command: 'rm -rf spec/javascripts/helpers'
      },
      removeDefaultHelper: {
        command: 'rm spec/javascripts/jasmine_helper.rb'
      },
      removePlayerSpec: {
        command: 'rm spec/javascripts/PlayerSpec.js'
      },
      removePublic: {
        command: 'rm -rf public'
      }
    }
  });

  grunt.registerTask('prepare', [
    'shell:bundle',
    'shell:jasmine',
    'shell:removeHelpers',
    'shell:removeDefaultHelper',
    'shell:removePlayerSpec',
    'shell:removePublic'
  ]);
};
