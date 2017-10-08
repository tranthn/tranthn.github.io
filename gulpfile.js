var gulp = require('gulp');
var nunjucks = require('nunjucks');
var nunjucksRender = require('gulp-nunjucks-render');
var watch = require('gulp-watch');

var renderTemplates = function() {
  	// Gets .html and .nunjucks files in pages
  	return gulp.src('views/*.nunjucks')
  	// Renders template with nunjucks
  	.pipe(nunjucksRender({
      	path: ['views']
    }))
  	// output files in app folder
  	.pipe(gulp.dest('./'))
};

gulp.task('render', renderTemplates);

gulp.task('watch', ['render'], function() {
	gulp.watch('views/*.{html,nunjucks}', ['render']);
});