var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

/*
other way of declaring multiple variables:
var gulp = require('gulp'),
watch = require('gulp-watch');
*/

gulp.task('default', function(){
	console.log("Hooray - you created a Gulp task.");
});

gulp.task ('html', function(){
	//console.log("Imagine something useful being done to your HTML here.");
});

gulp.task ('styles', function(){
	//console.log("Imagine SASS or postCSS tasks running here.");
	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
	.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){

	browserSync.init({
		notify: false, /*removes injected notification on top right of the page*/
		server: {
			baseDir: "app"
		}
	})

	watch('./app/index.html', function(){
		browserSync.reload();
	});
	/*watch('./app/index.html', function(){
		gulp.start('html');
	});*/ //watches the index.html file and starts the gulp task named html

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject'); /*at first, it was just 'styles' instead of cssInject.. so now we need to have the post-process in another task: in cssInject*/
	})
});

gulp.task('cssInject', ['styles'], function(){
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
}) /*cssInject is the name of the task. We can give any name
The ['styles'] indicates that styles task is a dependency that needs to be run before cssInject
Any time we change any css file, we are triggering cssInject... but it runs only after styles*/