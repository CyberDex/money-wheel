
const webpackConfig = require('./webpack/webpack')

module.exports = webpackConfig({
    entryPoints: {
        main: "src/Game.ts"
    },
    sourceFolder: "src",
    assetsFolder: "assets",
    HTMLTemplate: "assets/index.html",
    templateParameters: {
        "title": "Money Wheel"
    }
})