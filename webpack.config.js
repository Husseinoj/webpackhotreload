const mode = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const entry = {
    main:['./Source/index.js','./Source/jafar.js','./Source/gholi.js','./Source/main.css']
}
const _module = {
    rules:[
        {
            test:/\.css$/,
            exclude:/node_modules/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
    ]
}
const output = {
    filename: '[name].bundle.js',
    path:__dirname+'/wwwroot/js'
}
const plugins = [
    new MiniCssExtractPlugin({
        filename:'../css/[name].bundle.css'
    })
]
module.exports={
    entry,
    mode,
    module:_module,
    output,
    plugins
}