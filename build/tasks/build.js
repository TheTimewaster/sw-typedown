var gulp = require("gulp");
var clean = require("gulp-clean");
var typescript = require("gulp-typescript");
var htmlmin = require("gulp-htmlmin");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var runsequence = require("run-sequence");
var paths = require("../paths");

gulp.task("clean",function(){
    return gulp.src([paths.output])
        .pipe(clean({force:true}));
})

var typescriptCompiler = typescriptCompiler || null;
gulp.task("build-system", function () {
    if (!typescriptCompiler) {
        typescriptCompiler = typescript.createProject("./tsconfig.json", {
            "typescript": require("typescript")
        });
    }

    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(typescriptCompiler())
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "/src"}))
        .pipe(gulp.dest(paths.output));
});

gulp.task("build-html", function () {
    return gulp.src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.output));
});

gulp.task("build-css", function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(concat("styles.css"))
        .pipe(gulp.dest(paths.output));
});

gulp.task("copy-resources", function () {
    return gulp.src("src/**/*.json")
        .pipe(gulp.dest(paths.output));
});

gulp.task("build", function (callback) {
    runsequence("clean", [ "copy-resources", "build-system", "build-html", "build-css" ])
})