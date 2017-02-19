var appRoot = "src/";
var outputRoot = "dist/";
var exporSrvtRoot = "export/";
var styles = "styles/";

module.exports = {
    root: appRoot,
    source: appRoot + '**/*.ts',
    html: appRoot + '**/*.html',
    scss: styles + '**/*.scss',
    style: 'dist/**/*.css',
    output: outputRoot,
    exportSrv: exporSrvtRoot,
    dtsSrc: [
        './typings/**/*.d.ts'
    ]
}