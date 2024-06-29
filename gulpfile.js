const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean"); // Добавляем плагин gulp-clean

// Пути к файлам
const paths = {
  pug: {
    src: "src/pug/**/*.pug",
    dest: "dist/",
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: "src/img/**/*",
    dest: "dist/img/",
  },
};

// Очистка папки dist
function cleanDist() {
  return gulp.src("dist/*", { read: false }).pipe(clean());
}

// Компиляция Pug в HTML
function compilePug() {
  return gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

// Компиляция SCSS в CSS
function compileSass() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Копирование скриптов
function copyScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Копирование и оптимизация изображений
// async function copyImages() {
//   const imagemin = await import("gulp-imagemin");

//   return gulp
//     .src(paths.images.src)
//     .pipe(
//       imagemin.default([
//         imagemin.mozjpeg({ quality: 100, progressive: true }),
//         imagemin.optipng({ optimizationLevel: 5 }),
//         imagemin.svgo({
//           plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
//         }),
//       ])
//     )
//     .pipe(gulp.dest(paths.images.dest))
//     .pipe(browserSync.stream());
// }

function copyImages() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Слежение за изменениями файлов
function watchFiles() {
  gulp.watch(paths.pug.src, compilePug);
  gulp.watch(paths.styles.src, compileSass);
  gulp.watch(paths.scripts.src, copyScripts);
  gulp.watch(paths.images.src, copyImages);
}

// Запуск сервера BrowserSync
function liveServer() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    notify: false,
    open: true,
  });
  watchFiles();
}

// Определение задач
const build = gulp.series(
  cleanDist,
  gulp.parallel(compilePug, compileSass, copyScripts, copyImages)
);
const serve = gulp.series(build, liveServer);

// Экспорт задач
exports.compilePug = compilePug;
exports.compileSass = compileSass;
exports.copyScripts = copyScripts;
exports.copyImages = copyImages;
exports.build = build;
exports.serve = serve;
exports.default = serve;

