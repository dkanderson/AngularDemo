'use strict';
module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		jshint:{
			options:{
				jshintrc: '.jshintrc'
			},
			all:[
				'Gruntfile.js',
				'assets/js/*.js',
				'assets/js/models/*.js',
				'assets/js/views/*.js',
				'assets/js/collections/*.js',
				'assets/js/routers/*.js',
				'!assets/js/scripts.min.js'
			]
		},
		less:{
			dist:{
				files:{
					'assets/css/main.min.css' : [
					'assets/less/app.less'
					]
				},
				options:{
					compress: true,
					sourceMap: false,
					sourceMapFilename: 'assets/css/main.min.css.map',
					SourceMapRootpath: '/'
				}
			}
		},
		uglify:{
			dist:{
				files:{
					'assets/js/plugins/bootstrap.min.js':[
						'assets/js/plugins/bootstrap/transition.js',
			            'assets/js/plugins/bootstrap/alert.js',
			            'assets/js/plugins/bootstrap/button.js',
			            'assets/js/plugins/bootstrap/carousel.js',
			            'assets/js/plugins/bootstrap/collapse.js',
			            'assets/js/plugins/bootstrap/dropdown.js',
			            'assets/js/plugins/bootstrap/modal.js',
			            'assets/js/plugins/bootstrap/tooltip.js',
			            'assets/js/plugins/bootstrap/popover.js',
			            'assets/js/plugins/bootstrap/scrollspy.js',
			            'assets/js/plugins/bootstrap/tab.js',
			            'assets/js/plugins/bootstrap/affix.js'
					]
				},
				options: {
					// JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
		          	// sourceMap: 'assets/js/scripts.min.js.map',
		          	// sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
				}
			}
		},
		watch:{
			less:{
				files:[
					'assets/less/*.less',
					'assets/less/bootstrap/*.less'
				],
				tasks:[
					'less'
				]
			},
			js:{
				files:[
				'<%= jshint.all %>'
				],
				tasks:['jshint', 'uglify']
			}
		},
		livereload:{
			options: {
				livereload: true
			},
			files:[
				'assets/css/main.min.css',
				'assets/js/scripts.min.js',
				'*.html'
			]
		},
		clean: {
			dist: [
				'assets/css/main.min.css',
				'assets/js/scripts.min.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', [
		'clean',
		'less',
		'uglify'
		]);
	grunt.registerTask('dev', [
	    'watch'
	  ]);
};