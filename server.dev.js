const express = require('express');
const opn = require('opn');
const LOCAL_HOST_PORT = 3000;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
/***************
 * Entry
 */
let entryArray = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
];

if(Array.isArray(config.entry)){
    entryArray=config.entry;
    config.entry.forEach(e=>{
        entryArray.push(e);
    })
} else {
    for(let entry in config.entry){
        if(config.entry.hasOwnProperty(entry)===false){
            continue;
        }
        const e = config.entry[entry];
        if(Array.isArray(e)){
            e.forEach(x => {
                entryArray.push(x);
            })
        } else if(typeof e ==='string'){
            entryArray.push(e);
        } else{
            throw new Error('property does not exsit');
        }
    }
}
config.entry=entryArray;
/***************
 * Output
 */
config.output = {
    path:'/',
    publicPath:`http://localhost:${LOCAL_HOST_PORT}/wwwroot/js/`,
    filename:'bundle.js'
}

const hmrPlugin = new webpack.HotModuleReplacementPlugin();
if(typeof config.plugins ===undefined || config.plugins===null){
    config.plugins=[hmrPlugin];
} else {
    let foundHmr=false;
    config.plugins.forEach(x=>{
        foundHmr=foundHmr || x.constructor.name ===hmrPlugin.constructor.name;
    });
    if(foundHmr===false){
        config.plugins.push(hmrPlugin);
    }
}

/***************
 * Express
 */

console.log(config);
const compiler=webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath,
    stats:{colors:true}
}));

app.use(webpackHotMiddleware(compiler,{
    log:console.log
}));

app.use(express.static(__dirname));
router = express.Router();

router.get('/', (req, res) => res.render('index'));
app.use(router);

app.listen(LOCAL_HOST_PORT, () => console.log(`Listening on ${LOCAL_HOST_PORT}`));

opn(`http://localhost:${LOCAL_HOST_PORT}`);

