var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");

//////////////////

sass.compiler = require("node-sass");

//////////////////

// COPY HTML
gulp.task("copyHtml", () => {
  return gulp.src("src/index.html").pipe(gulp.dest("dist/"));
});

// COMPILE SCSS, MINIFY CSS & ADD Pre-FIXER for CSS
gulp.task("sass", () => {
  return gulp
    .src("src/sass/index.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist"));
});

// COMPILE BABEL to ES5 and minify JS code
gulp.task("script", () => {
  return gulp
    .src("src/script/**/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

// MINIFY IMAGES
gulp.task("imagesMin", function() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest("dist"));
});

// WATCH
gulp.task("watch", () => {
  gulp.watch("src/index.html", ["copyHtml"]);
  gulp.watch("src/sass/**/*.scss", ["sass"]);
  gulp.watch("src/script/**/*", ["script"]);
  gulp.watch("src/images/**/*", ["imagesMin"]);
});

// DEFAULT
gulp.task("default", ["watch"]);
