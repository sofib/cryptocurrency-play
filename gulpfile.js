const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps')
// const eslint = require('gulp-eslint')

const jsFolder = 'lib'

gulp.task('default', function () {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    // sourcemap probably not supported: .pipe(eslint({fix: true}))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest(jsFolder))
})