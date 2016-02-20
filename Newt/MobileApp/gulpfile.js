var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');
var es = require('event-stream');
var shell = require('gulp-shell');
var run = require('gulp-run');
var versioning = require('./gulp-versioning');
var mocha = require('gulp-mocha');
var argv = require('yargs').argv

var jest = require('gulp-jest-iojs');

var fs = require('fs');

var env = 'dev';

var config = {
  bowerDir: './app/vendor'
};

gulp.task('define-env', function() {
  fs.writeFileSync('app/scripts/env-config.js', 'module.exports = { env : "' + argv.env + '"};');
});

gulp.task('jest', function() {
  return gulp.src('app/scripts/specs/components').pipe(jest({
    scriptPreprocessor: "../../../../preprocessor.js",
    unmockedModulePathPatterns: [
      "node_modules/react"
    ],
    testDirectoryName: "",
    testPathIgnorePatterns: [
      "node_modules",
      "spec/support"
    ],
    moduleFileExtensions: [
      "js",
      "json",
      "react"
    ]
  }));
});

gulp.task('spec-test', function() {
  return gulp.src('app/scripts/specs/**/**.*', {
    read: false
  })
    .pipe(mocha({
      reporter: 'spec'
    }));
});


gulp.task('versioning', function() {
  var build = argv.build;
  versioning.start(build);
});

gulp.task('clean:dev', function() {
  return del(['.tmp']);
});

gulp.task('clean:dist', function() {
  return del(['dist/*']);
});

gulp.task('cp_fontawesome_icons', function() {
  var app_font = gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest('app/fonts'));
  var dest_font = gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest('dist/fonts'));

  return es.concat(app_font, dest_font);
});


gulp.task('cp_google_material_ui_icons', function() {
  var app_font = gulp.src(config.bowerDir + '/material-design-icons/iconfont/**.*')
    .pipe(gulp.dest('app/styles/fonts/material-design-icons'));
  var dest_font = gulp.src(config.bowerDir + '/material-design-icons/iconfont/**.*')
    .pipe(gulp.dest('dist/styles/fonts/material-design-icons'));

  return es.concat(app_font, dest_font);
});

gulp.task('scripts', function() {
  var bundler = browserify('./app/scripts/app.js', {
    extensions: ['.jsx'],
    debug: env == 'dev'
  }).transform('reactify');

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('compass', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.compass({
      css: '.tmp/styles',
      sass: 'app/styles'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(vinylPaths(del)) //Necessary because Compass always generates a file
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('copy_images', function() {
  gulp.src(['app/config.xml'])
    .pipe(gulp.dest('dist'));

  gulp.src(['app/favicon.ico'])
    .pipe(gulp.dest('dist'));

  gulp.src(['app/icon.png'])
    .pipe(gulp.dest('dist'));

  gulp.src(['app/splash.png'])
    .pipe(gulp.dest('dist'));

  gulp.src(['app/res/**/*'])
    .pipe(gulp.dest('dist/res'));

  gulp.src(['app/images/*.*'])
    .pipe(gulp.dest('dist/images'));

  return gulp.src(['app/images/quotes/*.*'])
    .pipe(gulp.dest('dist/images/quotes'));

});

gulp.task('copy_fonts', function() {
  return gulp.src(['app/styles/fonts/*.*'])
    .pipe(gulp.dest('dist/styles/fonts'));

});

gulp.task('copy', ['copy_fonts', 'cp_fontawesome_icons', 'cp_google_material_ui_icons', 'copy_images'], function() {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('dist'));
})

gulp.task('bundle', function() {
  var assets = $.useref.assets({
    searchPath: '{.tmp,app}'
  });
  var jsFilter = $.filter(['**/*.js']);
  var cssFilter = $.filter(['**/*.css']);
  var htmlFilter = $.filter(['*.html']);

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.uglify({
      compress: {
        drop_console: true
      }
    }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore())
    .pipe($.revAll({
      ignore: [/^\/favicon.ico$/g, '.html', '.png', /^fonts\/nt-fonts/g, '.eot', '.woff', '.ttf', '.svg', '.woff2']
    }))
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('webserver', function() {
  return gulp.src(['.tmp', 'app'])
    .pipe($.webserver({
      host: '0.0.0.0', //change to 'localhost' to disable outside connections
      port: 8501,
      livereload: true,
      open: true
    }));
});

gulp.task('serve', function() {
  runSequence('clean:dev', ['define-env', 'scripts', 'compass', 'cp_fontawesome_icons', 'cp_google_material_ui_icons'], 'webserver');

  gulp.watch('app/*.html');

  gulp.watch('app/scripts/**/*.js', ['scripts']);

  gulp.watch('app/scripts/**/*.jsx', ['scripts']);

  gulp.watch('app/styles/**/*.scss', ['compass']);
});


gulp.task('build', function() {
  env = 'prd';

  runSequence(['versioning'], ['clean:dev'], ['clean:dist'],
    ['define-env', 'scripts', 'compass'], ['copy'], ['bundle']);
});
