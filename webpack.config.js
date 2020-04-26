
const webpackConfig = require('./src/submodules/webpack')

module.exports = webpackConfig({
    entryPoints: {
        main: "src/main.ts"
    },
    sourceFolder: "src",
    assetsFolder: "assets",
    HTMLTemplate: "assets/index.html",
    templateParameters: {
        "title": ""
    }
})