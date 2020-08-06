const path = require("path");
//var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development", // "production" | "development"
    entry: [
        "./src/NavMenu.tsx"
    ],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "../js")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: { modules: true }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
                loader: "exports-loader"

            },
            //{
            //    test: /\.html$/i,
            //    loader: "html-loader"
            //},onlyCompileBundledFiles: true,
            {
                test: /\.js$/,
                enforce: "pre",
                use: ['source-map-loader']
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    {
                        loader: "ts-loader",
                        options: {
                            
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts?$/,
                loaders: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve : {
        extensions: [".ts", ".tsx", ".js", ".mjs", ".jsx"]
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
    //devtool: "source-map"
};
