const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ["./assets/index.js"],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "./build/")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: "html-loader", options: { minimize: false } }]
            },
            {
                test: /\.jpg$/,
                use: "file-loader"
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-decorators-legacy", "transform-class-properties"]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./assets/index.html",
            filename: "./index.html"
        }),
        new CopyWebpackPlugin([
            { from: 'assets/external/open-iconic/font/fonts', to: 'fonts' },
            { from: 'assets/images', to: 'images' }
        ], {
            ignore: [],
            copyUnmodified: true
        }),
        new ExtractTextPlugin({
          filename: '[name].css'
        })
    ]
};