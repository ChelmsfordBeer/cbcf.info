const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const fs = require('fs');

const cssAddonsPath = './css/modules/';

// CSS Tasks
gulp.task('css-compile', function() {
  gulp.src('scss/*.scss')
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'));

  gulp.start('css-compile-modules');
});

// CSS Tasks
gulp.task('css-compile-modules', function() {
  gulp.src('scss/**/modules/**/*.scss')
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename({
      dirname: cssAddonsPath
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('css-minify', function() {
  gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css', '!./dist/css/bootstrap.css'])
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'));

  gulp.start('css-minify-modules');
});

gulp.task('css-minify-modules', function() {
  gulp.src(['./dist/css/modules/*.css', '!./dist/css/modules/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/modules'));
});

// JavaScript Tasks
gulp.task('js-build', function() {

  const plugins = getJSModules();

  gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(gulp.dest('./dist/js/'));

  gulp.start('js-lite-build');
});

gulp.task('js-lite-build', function() {

  const pluginsLite = getLiteJSModules();

  gulp.src(pluginsLite.modules)
    .pipe(concat('mdb.lite.js'))
    .pipe(gulp.dest('./dist/js/'));

  gulp.start('js-lite-minify');

});

gulp.task('js-minify', function() {
  gulp.src(['./dist/js/mdb.js'])
    .pipe(minify({
      ext: {
        // src:'.js',
        min: '.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('js-lite-minify', function() {
  gulp.src(['./dist/js/mdb.lite.js'])
    .pipe(minify({
      ext: {
        // src:'.js',
        min: '.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./dist/js'));
});

// Image Compression
gulp.task('img-compression', function() {
  gulp.src('./img/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/img'));
});

// Live Server
gulp.task('live-server', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      directory: true
    },
    notify: false
  });

  gulp.watch('**/*', {
    cwd: './dist/'
  }, browserSync.reload);
});

// Watch on everything
gulp.task('mdb-go', function() {
  gulp.start('live-server');
  gulp.watch('scss/**/*.scss', ['css-compile']);
  gulp.watch(['dist/css/*.css', '!dist/css/*.min.css'], ['css-minify']);
  gulp.watch('js/**/*.js', ['js-build']);
  gulp.watch(['dist/js/*.js', '!dist/js/*.min.js'], ['js-minify']);
  gulp.watch('**/*', {
    cwd: './img/'
  }, ['img-compression']);
  gulp.watch(['dist/pages/*.html', 'dist/partials/*.html'], ['fileinclude']);
  gulp.watch(['dist/2013/pages/*.html', 'dist/partials/*.html'], ['fileinclude1']);
  gulp.watch(['dist/2014/pages/*.html', 'dist/partials/*.html'], ['fileinclude2']);
  gulp.watch(['dist/2015/pages/*.html', 'dist/partials/*.html'], ['fileinclude3']);
  gulp.watch(['dist/2016/pages/*.html', 'dist/partials/*.html'], ['fileinclude4']);
  gulp.watch(['dist/2017/pages/*.html', 'dist/partials/*.html'], ['fileinclude5']);
  gulp.watch(['dist/2018/pages/*.html', 'dist/partials/*.html'], ['fileinclude6']);
  gulp.watch(['dist/2019/pages/*.html', 'dist/partials/*.html'], ['fileinclude7']);
});

function getJSModules() {
  delete require.cache[require.resolve('./js/modules.js')];
  return require('./js/modules');
}

function getLiteJSModules() {
  delete require.cache[require.resolve('./js/modules.lite.js')];
  return require('./js/modules.lite.js');
}

//HTML Includes
var fileinclude = require('gulp-file-include')
var fileinclude1 = require('gulp-file-include')
var fileinclude2 = require('gulp-file-include')
var fileinclude3 = require('gulp-file-include')
var fileinclude4 = require('gulp-file-include')
var fileinclude5 = require('gulp-file-include')
var fileinclude6 = require('gulp-file-include')
var fileinclude7 = require('gulp-file-include')

gulp.task('fileinclude', function() {
  gulp.src(['dist/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('fileinclude1', function() {
  gulp.src(['dist/2013/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2013'));
});

gulp.task('fileinclude2', function() {
  gulp.src(['dist/2014/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2014'));
});

gulp.task('fileinclude3', function() {
  gulp.src(['dist/2015/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2015'));
});

gulp.task('fileinclude4', function() {
  gulp.src(['dist/2016/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2016'));
});

gulp.task('fileinclude5', function() {
  gulp.src(['dist/2017/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2017'));
});

gulp.task('fileinclude6', function() {
  gulp.src(['dist/2018/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2018'));
});

gulp.task('fileinclude7', function() {
  gulp.src(['dist/2019/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './dist/partials'
    }))
    .pipe(gulp.dest('./dist/2019'));
});

function defaultTask(cb) {
  cb();
}

exports.default = defaultTask
