const gulp=require('gulp');//引入gulp模块
const html = require('gulp-minify-html');//压缩html
const css = require('gulp-minify-css');//压缩css
const uglifyjs=require('gulp-uglify');//压缩js
const rename=require('gulp-rename');//改名
const babel=require('gulp-babel'); //es6转es5
const es2015=require('babel-preset-es2015');
const babel_core=require('babel-core');
const watch=require('gulp-watch');  //监听
const image=require('gulp-imagemin');


// 1.测试
gulp.task('default',function(){
    console.log('hello,gulp');
});

//2.压缩html文件。
gulp.task('htmlfile',function(){
    return gulp.src('src/index.html')//引入文件
    .pipe(html())//压缩
    .pipe(gulp.dest('dist/'))//输出
});

//3.压缩css文件
gulp.task('cssfile',function(){
    return gulp.src('src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/css/'))
});

//4.压缩js文件
gulp.task('jsfile',function(){
    return gulp.src('src/script/js/*.js')
    .pipe(uglifyjs())
    .pipe(gulp.dest('dist/script/js/'))
});

//5.改名
// gulp.task('rename',function(){
//     return gulp.src('src/index.html').pipe(rename('index.min.html')).pipe(gulp.dest('dist/'))
// })


//6.es6转es5
//三个插件：gulp-babel  babel-core   babel-preset-es2015
gulp.task("babeljs", function () {
    return gulp.src("src/script/js/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/js/")).pipe(uglifyjs()).pipe(gulp.dest('dist/script/js/'));
});


// 压缩图片
gulp.task('images',function(){
    return gulp.src('img/*.*')
    .pipe(image({progressive: true}))
    .pipe(gulp.dest('dist/img/'))
})


//安装gulp-watch
gulp.task('default',function(){
	watch(['src/*.html','src/css/*.css','src/script/js/*.js'],gulp.parallel('htmlfile','cssfile','jsfile'));  
	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
	//gulp.parallel() –并行运行任务 
});