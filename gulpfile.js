var beep = require('beepbeep')
var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')

var header = require('gulp-header')
var jshint = require('gulp-jshint')
var react = require('gulp-react')
var rename = require('gulp-rename')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')

var pkg = require('./package.json')
var srcHeader = '/**\n\
 * <%= pkg.name %> <%= pkg.version %> - https://github.com/insin/<%= pkg.name %>\n\
 * MIT Licensed\n\
 */\n'

gulp.task('transpile-jsx', function() {
  return gulp.src('./index.jsx')
    .pipe(react({
      harmony: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('lint', ['transpile-jsx'], function() {
  return gulp.src('./build/*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
})

var broken = false
var needsFixed = false

gulp.task('browserify', ['lint'], function() {
  var b = browserify('./index.js', {
    detectGlobals: false
  , standalone: 'FilteredMultiSelect'
  })
  b.transform('browserify-shim')

  return b.bundle()
    .on('error', function(err) {
      gutil.log(err.message)
      beep(2, 0)
      broken = true
      this.emit('end')
    })
    .on('end', function() {
      if (broken) {
        needsFixed = true
      }
      else if (needsFixed) {
        beep()
        needsFixed = false
      }
      broken = false
    })
    .pipe(source('react-filtered-multiselect.js'))
    .pipe(streamify(header(srcHeader, {pkg: pkg})))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('react-filtered-multiselect.min.js'))
    .pipe(streamify(uglify()))
    .pipe(streamify(header(srcHeader, {pkg: pkg})))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function() {
  gulp.watch('./index.jsx', ['browserify'])
})

gulp.task('default', ['browserify', 'watch'])
