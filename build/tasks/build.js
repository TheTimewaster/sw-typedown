var gulp = require("gulp");
var clean = require("gulp-clean");
var typescript = require("gulp-typescript");
var tslint = require("gulp-tslint");
var htmlmin = require("gulp-htmlmin");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var runsequence = require("run-sequence");
var paths = require("../paths");
var rename = require("gulp-rename");

gulp.task("clean", function ()
{
    return gulp.src([ paths.output ])
        .pipe(clean({ force: true }));
});

gulp.task("ts-lint", function ()
{
    gulp.src(paths.tsSource)
    .pipe(tslint({formatter:"verbose"}))
    .pipe(tslint.report())
});

var typescriptCompiler = typescriptCompiler || null;
gulp.task("build-system", function ()
{
    if (!typescriptCompiler)
    {
        typescriptCompiler = typescript.createProject("./tsconfig.json", {
            "typescript": require("typescript")
        });
    }

    return gulp.src(paths.dtsSrc.concat(paths.tsSource))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(typescriptCompiler())
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "/src" }))
        .pipe(gulp.dest(paths.output));
});

gulp.task("rename-config", function() {
    return gulp.src(paths.configsSource.dev)
    .pipe(rename("configs.js"))
    .pipe(gulp.dest(paths.output));
})

gulp.task("build-html", function ()
{
    return gulp.src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.output));
});

gulp.task("build-css", function ()
{
    return gulp.src(paths.scss)
        .pipe(sass())
        //.pipe(concat("styles.css"))
        .pipe(gulp.dest(paths.output));
});

gulp.task("copy-resources", function ()
{
    return gulp.src("src/**/*.json")
        .pipe(gulp.dest(paths.output));
});

gulp.task("build", function (callback)
{
    runsequence("clean", [ "ts-lint", "copy-resources", "build-system", "build-html", "build-css", "rename-config" ])
})