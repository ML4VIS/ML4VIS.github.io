const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // devtool: 'inline-source-map',
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: [path.join(__dirname, 'videos'), path.join(__dirname, 'assets')],
        contentBasePublicPath: ['/videos', '/assets'],
        compress: true,
        hot: true,
        host: '0.0.0.0',
        // disableHostCheck: true,
        port: 21001
    },
    entry: {
        index: path.resolve(__dirname, './src/index.tsx'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!data', '!data/**/*', '!.git', '!.git/**/*'],
            cleanStaleWebpackAssets: false,
            verbose: true
        }),
        new HtmlWebpackPlugin({
            title: 'ML4VIS',
            filename: `index.html`,
            template: path.resolve(__dirname, `./src/index.html`),
            chunks: ['index'],
        })
    ],
    optimization: {
        usedExports: true,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { useBuiltIns: "usage", corejs: { version: 3, proposals: true }, targets: "last 2 versions and > 1%" }],
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js', '.tsx'
        ]
    },
    output: {
        filename: '[name].[contenthash].js',
        // path: path.resolve(__dirname, '../../vislang@public'),
        // path: path.resolve(__dirname, '../public')
    },

    output: {
        path: path.resolve(__dirname, 'dist')
    },

}
