var appRoot = "src/";
var outputRoot = "dist/";
var exporSrvtRoot = "export/";
var styles = "styles/";
var configsRoot = "configs/"

module.exports = {
    root: appRoot,
    tsSource: appRoot + '**/*.ts',
    html: appRoot + '**/*.html',
    scss: styles + '**/*.scss',
    style: 'dist/**/*.css',
    output: outputRoot,
    exportSrv: exporSrvtRoot,
    dtsSrc: [
        './typings/**/*.d.ts'
    ],
    configsSource: {
        dev: configsRoot + "LocalConfig.js"
    }
}