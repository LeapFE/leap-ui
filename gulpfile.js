const path = require("path");
const gulp = require("gulp");

const DIR = {
  less: path.resolve(__dirname, "./components/**/style/*.less"),
  lib: path.resolve(__dirname, "./lib"),
  es: path.resolve(__dirname, "./es"),
};

gulp.task("copyLess", () => {
  return gulp
    .src(DIR.less)
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es))
});

gulp.task("default", ["copyLess"]);
