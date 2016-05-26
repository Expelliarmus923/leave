const gulp = require("gulp"),
  babel = require("gulp-babel"),
  es2015 = require("babel-preset-es2015"),
  webpack = require("gulp-webpack"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  minifycss = require('gulp-minify-css');

gulp.task("default", () => {
  gulp.src("./lib/js/Leave.es6")
    .pipe(babel({
      presets: [es2015]
    }))
    .pipe(gulp.dest("./dist")) //es6转js必须在webpack之前，否则webpack找不到要包装的js会报错
    .pipe(webpack({ //babel编译import会转成require，webpack再包装以下代码让代码里支持require
      output: {
        filename: "leave_es6.js",
      },
      stats: {
        colors: true
      }
    }))
    .pipe(gulp.dest("./dist")); //包装好的js目录
})

gulp.task('minifyjs', () => {
  return gulp.src('./dist/*.js')
    .pipe(gulp.dest('./dist'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})
gulp.task('minifycss',function() {
  return gulp.src('./dist/*.css') //需要操作的文件
    .pipe(rename({
      suffix: '.min'
    })) //rename压缩后的文件名
    .pipe(minifycss()) //执行压缩
    .pipe(gulp.dest('./dist')); //输出文件夹
});
