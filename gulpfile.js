const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'docs'
        }
    });
});

gulp.task('styles', function () {
    return gulp
        .src('docs/sass/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('docs/sass/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('docs/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
