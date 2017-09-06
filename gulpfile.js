var gulp = require('gulp');

gulp.task('mytask', function(){
	return gulp.src('source-file')
	.pipe(plugin())
	.pipe(gulp.dest('folder'))
});