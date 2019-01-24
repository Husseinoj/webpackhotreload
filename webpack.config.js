const mode = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const entry = {
    main: ['./Source/index.js', './Source/jafar.js', './Source/gholi.js', './Source/main.site.scss']
}

const _module = {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
    }]
}
const output = {
    filename: '[name].bundle.js',
    path: __dirname + '/wwwroot/js'
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
module.exports = {
    entry,
    mode,
    module: _module,
    output,
    plugins
}