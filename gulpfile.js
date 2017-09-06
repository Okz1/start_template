var gulp  			= require('gulp'),
		sass        = require('gulp-sass'),
		browserSync = require('browser-sync');

//описуємо таск сасс 
gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true})) //інжектимо нащі стилі
});

// описуємо таск browserSync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app' // вибираємо папку'сервер'
		},
		notify: false  // відключаємо спливаючі вікна в браузері
	});
}); 

//описуємо таск watch який слідкує за зміною в файлах
gulp.task('watch',['browser-sync', 'sass'], function() { //в квадратних дужках перераховуємо таски, які треба виконати до запуску таску watch, в даному випадку браузер сінк і сасс
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); // слідкуємо за змінами в html файлі
	gulp.watch('app/js/**/*.js', browserSync.reload);	 // слідкуємо за змінами в js файлі
});
