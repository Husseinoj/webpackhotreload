const mode = process.env.NODE_ENV || 'development';
const isDev= mode === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const entry = {
    main: ['./Source/main.site.ts', './Source/index.js', './Source/jafar.js', './Source/gholi.js', './Source/main.site.scss']
}
if(isDev){
    Object.keys(entry).forEach(x=>{
        if(typeof entry[x]==='string'){
            entry[x]=[entry[x]];
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
                isDev?'style-loader':MiniCssExtractPlugin.loader,
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
if(isDev)
   plugins.push( new webpack.HotModuleReplacementPlugin());
module.exports = {
    entry,
    mode,
    module: _module,
    output,
    plugins
}