var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task ('styles', function(){
	//console.log("Imagine SASS or postCSS tasks running here.");
	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
	/*means... on error (if an error occurs), apply the function... errorInfo is free naming*/
	.on('error', function(errorInfo){ 
		console.log(errorInfo.toString()); /*toString creates a more readable error message than if we just write errorInfo*/
		this.emit('end'); /*we want this task to come to an end*/
	})
	.pipe(gulp.dest('./app/temp/styles'));
});