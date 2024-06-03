const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
    entry: {
        path: './src/main.ts',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        filename: 'assets/[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
        }),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: 'vue_element',
            filename: 'remoteEntry.js',
            exposes: {
                './MyTree': './src/web-components/MyTree.ce.js',
            },
            remotes: {
                react_app: 'react_app@http://localhost:3000/remoteEntry.js',
            },
        }),
    ],
};
