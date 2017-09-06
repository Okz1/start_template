// Підключаємо бібліотеки 
var gulp  			= require('gulp'),
		sass        = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat      = require('gulp-concat'), //конкатинація 
		uglify 			=	require('gulp-uglifyjs'), // зжимаємо js файли
		cssnano  		=	require('gulp-cssnano'),// мініфікація css
		rename			=	require('gulp-rename');

//описуємо таск сасс 
gulp.task('sass',function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true})) //інжектимо нащі стилі
});


//Сюди підключаємо бібліотеки для конкатинації і мініфікації
gulp.task('scripts', function(){
	return gulp.src([ // беремо потрібні нам файли для конкатинації
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
	.pipe(concat('libs.min.js')) // мінифіцирований файл з бібліотеами js
	.pipe(uglify()) // зжимаємо файл
	.pipe(gulp.dest('app/js')); // вигружаємо файл сюди
});

//мініфікація і перейменування libs.css
gulp.task('css-libs',['sass'], function(){
	return gulp.src('app/css/libs.css') // вибір файлу
	.pipe(cssnano()) // мініфікація
	.pipe(rename({suffix: '.min'}))// добавляємо суфікс
	.pipe(gulp.dest('app/css')); // вибираємо розташування
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
gulp.task('watch',['browser-sync', 'css-libs', 'scripts'], function() { //в квадратних дужках перераховуємо таски, які треба виконати до запуску таску watch, в даному випадку браузер сінк і сасс
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); // слідкуємо за змінами в html файлі
	gulp.watch('app/js/**/*.js', browserSync.reload);	 // слідкуємо за змінами в js файлі
});
