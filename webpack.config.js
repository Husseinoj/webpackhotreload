const enviroment = process.env.NODE_ENV || 'development';
const autoprefixer = require('autoprefixer');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = {
    'main': ['./Source/main.site.ts', './Source/main.site.scss']
}

const _module = {
    rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                'ts-loader'
            ]
        },
        {
            test: /\.pug$/,
            exclude: /node_modules/,
            use: [
                'raw-loader',
                'pug-html-loader'
            ]
        },
        {
            test: /\.component.scss$/,
            exclude: /node_modules/,
            use: [
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ]
          
        },
        {
            test: /\.site.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            })
        }
    ]
}
const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'common',
                chunks: 'all'
            }
        }
    }
}

const output = {
    filename: '[name].bundle.js',
    path: __dirname + '/wwwroot/js/',
    pathinfo: true
}

if (enviroment === 'production') {
    output.filename = '[name].bundle.min.js',
    output.pathinfo = false;
} else if (enviroment === 'development') {
    output.publicPath = '/js/';
}

const plugins = [
    new ExtractTextPlugin({
        filename: enviroment === 'production' ? '../css/[name].bundle.min.css' : '../css/[name].bundle.css',
        disable: false,
        allChunks: false
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer()
            ]
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
];

const resolve = {
    extensions: [".ts", ".js"]
}

module.exports = {
    entry: entry,
    output: output,
    resolve: resolve,
    mode: enviroment,
    module: _module,
    optimization: optimization,
    plugins: plugins
}