module.exports = {
    bundles: {
        "dist/app-build": {
            "includes": [
                "[**/*.js]",
                "**/*.html!text",
                "**/*.css!text"
            ],
            options: {
                inject: true,
                minify: false
            }
        },
        "dist/aurelia": {
            includes: [
                "aurelia-framework",
                "aurelia-router",
                "aurelia-polyfills",
                "aurelia-bootstrapper",
                "aurelia-fetch-client",
                "fetch",
                "jquery"
            ],
            "options": {
                inject: true,
                minify: true
            }
        }
    }
};