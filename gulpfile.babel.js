import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import fs from 'fs';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import inlineCss from 'gulp-inline-css';
import browserSync from 'browser-sync';

gulp.task('serve', ['sass', 'pug'], function() {
  browserSync.init({
    server: {
      baseDir: 'build/output',
      index: 'mail.html'
    }
  });
  gulp.watch('src/templates/*.scss', ['sass','inlineCss']);
  gulp.watch('src/templates/*.pug', ['pug','inlineCss']);
  gulp.watch('src/data/*.json', ['pug','inlineCss']);
  gulp.watch('build/output/*.html').on('change', browserSync.reload);
});

gulp.task('pug', function buildHTML () {
  fs.readFile('src/data/news.json', 'utf-8', function (err, content) {
      if (err) {
        console.error(err);
      } else {
        content = JSON.parse(content);
        return gulp.src('src/templates/*.pug')
        .pipe(pug({
          pretty: true,
          data: content, 
        }))
        .pipe(gulp.dest('build/output/'));
      }
});
  
  
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(concat('all.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/output/'));
});

gulp.task('inlineCss', ['sass', 'pug'], function() {
  return gulp.src('build/output/*.html')
        .pipe(inlineCss({
          applyLinkTags: true,
          applyTableAttributes: true,
          removeLinkTags: true,
          removeHtmlSelectors: true
        }))
       .pipe(gulp.dest('build/output/'));
});
