const path = require("path");

//const TerserPlugin = require("terser-webpack-plugin");

//var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(_, arg) {
    console.log(arg.mode);

    const config = {
        mode: arg.mode,
        entry: [
            "./src/index.tsx",
            "./src/Styles/site.scss"
        ],
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "../js")
        },
        module: {
            rules: [
                {
                    test: /\.json$/i,
                    use: [
                        {
                            loader: "raw-loader",
                            options: {
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            // Creates `style` nodes from JS strings
                            loader: "style-loader",
                            options: {
                            }
                        },
                        {
                            // Translates CSS into CommonJS
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            // Compiles Sass to CSS
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    indentWidth: 4
                                },
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, "src"),
                    exclude: path.resolve(__dirname, "node_modules"),
                    use: [
                        {
                            loader: "exports-loader"
                        },
                        {
                            loader: "eslint-loader",
                            options: {
                                emitError: true,
                                emitWarning: true,
                                failOnError: true,
                                failOnWarning: false,
                                cache: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: [{
                            "loader":"source-map-loader"
                        }
                    ]
                },
                {
                    test: /\.tsx$/,
                    loaders: [
                        {
                            loader: "ts-loader",
                            options: {
                                allowTsInNodeModules: true,
                                transpileOnly: true
                            }
                        }
                    ],
                    include: path.resolve(__dirname, "src"),
                    exclude: path.resolve(__dirname, "node_modules")
                },
                {
                    test: /\.ts$/,
                    loaders: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }
                    ],
                    include: path.resolve(__dirname, "src"),
                    exclude: path.resolve(__dirname, "node_modules")
                }
            ]
        },
        resolve: {
            modules: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "src/Controls"),
                path.resolve(__dirname, "src/Controls/LayoutItems"),
                path.resolve(__dirname, "src/Controls/MapboxControls"),
                path.resolve(__dirname, "src/Controls/MapboxLayers"),
                path.resolve(__dirname, "src/Controls/MapboxSchemas"),
                path.resolve(__dirname, "src/Data"),
                path.resolve(__dirname, "src/DataTypes"),
                path.resolve(__dirname, "src/Extensions"),
                path.resolve(__dirname, "src/Programs"),
                path.resolve(__dirname, "src/Services"),
                path.resolve(__dirname, "src/Themes"),
                path.resolve(__dirname, "src/Utilities"),
                path.resolve(__dirname, "node_modules")
            ],
            extensions: [".ts", ".tsx", ".js", ".mjs", ".jsx", ".css", ".scss", ".sass"]
        },
        plugins: [
            //new CleanWebpackPlugin(),
            ////new ArcGISPlugin({
            ////    features: {
            ////        "3d": false
            ////    }
            ////}),
            //new HtmlWebpackPlugin({
            //    title: "QueryDb",
            //    template: "index.ejs",
            //    filename: "./index.html",
            //    favicon: "./src/assets/favicon.ico",
            //    chunksSortMode: "none",
            //    inlineSource: ".(css)$",
            //    inject: false
            //})
            //new MiniCssExtractPlugin({
            //    filename: "[name].[chunkhash].css",
            //    chunkFilename: "[id].css"
            //})
        ],
        node: {
            child_process: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty"
        }
    };

    if (arg.mode === "development") {
        config.devtool = "eval-source-map";
    }

    if (arg.mode === "production") {
        //config.optimization.minimizer.push(
        //    new TerserPlugin({
        //        cache: true,
        //        parallel: true,
        //        sourceMap: false
        //    })
        //);
    }

    return config;
};
