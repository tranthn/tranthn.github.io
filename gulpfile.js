var gulp = require('gulp');
var nunjucks = require('nunjucks');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('render', function() {
  	// Gets .html and .nunjucks files in pages
  	return gulp.src('views/*.nunjucks')
  	// Renders template with nunjucks
  	.pipe(nunjucksRender({
      	path: ['views']
    }))
  	// output files in app folder
  	.pipe(gulp.dest('./'))
});