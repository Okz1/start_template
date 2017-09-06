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

//описуємо таск watch який слідкує за зміною в файлах
gulp.task('watch',['browser-sync'], function(){ //в квадратних дужках перераховуємо таски, які треба виконати до запуску таску watch, в даному випадку браузер сінк
	gulp.watch('app/sass/**/*.sass', ['sass']);
});

// описуємо таск browserSync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app' // вибираємо папку'сервер'
		}
		notify: false // відключаємо спливаючі вікна в браузері
	});
}); 