const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const entry = {
    'main': './Source/main.site.ts',
    'index': './Source/index.js',
    'jafar': './Source/jafar.js',
    'gholi': './Source/gholi.js'
}
if (isDev) {
    Object.keys(entry).forEach(x => {
        if (typeof entry[x] === 'string') {
            entry[x] = [entry[x]];
        }
        entry[x].push('webpack-hot-middleware/client')
    })
}

console.log(entry);
const _module = {
    rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                'ts-loader'
            ]
        }
    ]
}
const output = {
    filename: '[name].bundle.js',
    path: __dirname + '/static/wwwroot/js'
}
const plugins = [
    new MiniCssExtractPlugin({
        filename: '../css/[name].bundle.css'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer()]
        }
    })
]
if (isDev)
    plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new BundleAnalyzerPlugin());

const optimization = {
    splitChunks: {
        cacheGroups: {
            lodash: {
                test: /[\\/]node_modules[\\/]((lodash).*)[\\/]/,
                name: 'gholi',
                chunks: 'all'
            },
            commons: {
                test: /[\\/]node_modules[\\/]((?!lodash).*)[\\/]/,
                name: 'common',
                chunks: 'all'
            }
        }
    }
}
module.exports = {
    entry,
    mode,
    module: _module,
    optimization,
    output,
    plugins
}