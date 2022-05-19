const CracoLessPlugin = require("craco-less")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const interpolateHtml = require("craco-interpolate-html-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const {getThemeVariables} = require("antd/dist/theme")

const isEnvProduction = process.env.NODE_ENV === "production"
process.env.GENERATE_SOURCEMAP = !isEnvProduction

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            if (isEnvProduction)
                webpackConfig.optimization.splitChunks = {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 105000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // получает имя, то есть node_modules/packageName/not/this/part.js
                                // или node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                                // имена npm-пакетов можно, не опасаясь проблем, использовать
                                // в URL, но некоторые серверы не любят символы наподобие @
                                return `npm.${packageName.replace("@", "")}`
                            }
                        }
                    }
                }
            return webpackConfig
        }
        // plugins: [...(
        //     isEnvProduction ? [
        //         new CompressionPlugin({
        //             filename: "[path].gz[query]",
        //             algorithm: "gzip",
        //             test: /\.(js|css)$/
        //         })
        //     ] : []
        // )]
    },
    plugins: [
        {
            plugin: BabelRcPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {
                            ...getThemeVariables({dark: true}),
                            "@font-family": "-apple-system, Montserrat, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                            // background
                            "@popover-background": "#010b24",
                            "@component-background": "#010b24",
                            "@secondary-background": "#262b48",
                            "@gradient-background": "linear-gradient(160deg, #2f3957 0%, #0c132c 50%);",
                            // border
                            "@border-color-base": "#ffffff12",
                            "@border-color-split": "#ffffff12",
                            "@border-width-base": "1px",
                            "@border-radius-base": "10px",
                            // font-size
                            "@font-size-big": "20px",
                            "@font-size-xl": "18px",
                            // color
                            "@success-color": "#4cc279",
                            "@warning-color": "#ff6370",
                            "@error-color": "#ff6370",
                            "@black": "#161938",
                            "@primary-color": "#fe9c64",
                            "@text-color-secondary": "#9babc5"
                        }
                    }
                }
            }
        },
        {
            plugin: rewireBabelLoader,
            options: {
                excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            }
        },
        {
            plugin: interpolateHtml,
            options: {
                TITLE: "InsideBySana POS-система",
                DESCRIPTION: "InsideBySana POS-система",
                MANIFEST: "manifest.json",
                HEAD_TAGS: ""
            }
        }
    ]
}
