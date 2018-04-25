var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

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