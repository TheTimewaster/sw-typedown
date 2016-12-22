var gulp = require("gulp");
var typescript = require("gulp-typescript");
var htmlmin = require("gulp-htmlmin");
var sourcemaps = require("gulp-sourcemaps");

var typescriptCompiler = typescriptCompiler || null;
gulp.task("build-system", function(){
    if(!typescriptCompiler)
    {
        typescriptCompiler = typescript.createProject("./tsconfig.json",{
            "typescript":require("typescript")
        });
    }

    return gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(typescriptCompiler())
        .pipe(sourcemaps.write(".",{includeContent:false, sourceRoot: "/src"}))
        .pipe(gulp.dest("dist"));
});

gulp.task("build-html", function(){
    return gulp.src("src/**/*.html")
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest("dist"));
});

gulp.task("build", ["build-system", "build-html"], function(callback){
    return callback;
})