var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /.css$/,
                loader: ["style-loader", "css-loader?modules=true&camelCase"],
                include: path.resolve(__dirname, 'src', 'css'),
            },
            {
                test: /.css$/,
                loader: ["style-loader", "css-loader?modules=false"],
                include: path.resolve(__dirname, 'node_modules')
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader", options: { limit: 10000, mimetype: "application/font-woff" } },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", options: { publicPath: "/fonts/", outputPath: "fonts/" } }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin([
            { from: 'src/index.html' }
        ])
    ]
};