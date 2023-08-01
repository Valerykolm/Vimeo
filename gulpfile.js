const { src, dest, parallel } = require('gulp');
const { watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


const buildSass = () => {
  console.log('Компиляция SASS');

  return src('src/sass/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildHTML = () => {
  console.log('Copy HTML');

  return src('src/pages/*.html')
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('src/sass/*.scss', buildSass);
  watch('src/pages/*.html', buildHTML);
};

exports.build = parallel(buildSass, buildHTML);
exports.server = browserSyncJob;