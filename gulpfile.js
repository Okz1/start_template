// Підключаємо модулі 
var gulp  				= require('gulp'),
		sass        	= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat      	= require('gulp-concat'), //конкатинація 
		uglify 				=	require('gulp-uglifyjs'),// зжимаємо js файли
		del						= require('del'),
		autoprefixer 	= require('gulp-autoprefixer'), // автопрефіксер
		cssnano  			=	require('gulp-cssnano'), // працює
		rename				=	require('gulp-rename'),
		del						= require('del'), //працює
		imagemin			= require('gulp-imagemin'),// працює 
		pngquant			=	require('gulp-pngquant');// працює 

//описуємо таск сасс 
// gulp.task('sass' , function(){
// 	return gulp.src('app/sass/**/*.sass')
// 		.pipe(sass())
// 		.pipe(autoprefixer(['> 1%', 'ie 8', 'ie 7','last 15 versions'],{ cascade: true}))
// 		.pipe(gulp.dest('app/css'))
// 		.pipe(browserSync.reload({stream: true})) //інжектимо наші стилі
// });
//описуємо таск scss
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['> 1%', 'ie 8', 'ie 7','last 15 versions'],{ cascade: true}))
 		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true})) //інжектимо наші стилі
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




//очистка папки dist
gulp.task('clean', function(){
	return del.sync('dist'); // працює
});

// обробка фото
gulp.task("img", function(){
	return gulp.src('app/img/**/*')	
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/img'));	
});

//описуємо таск watch який слідкує за зміною в файлах
gulp.task('watch',['browser-sync', 'css-libs', 'scripts'], function() { //в квадратних дужках перераховуємо таски, які треба виконати до запуску таску watch, в даному випадку браузер сінк і сасс
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload); // слідкуємо за змінами в html файлі
	gulp.watch('app/js/**/*.js', browserSync.reload);	 // слідкуємо за змінами в js файлі
});

//таск для компіляції робочої папки в продакшен
gulp.task('build',['clean','sass','scripts','img'], function(){

	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css',

		])
		.pipe(gulp.dest('dist/css')); //переносимо css в dist

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts')); //переносимо fonts в dist

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js')); //переносимо js в dist

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist')); //переносимо html в dist
});