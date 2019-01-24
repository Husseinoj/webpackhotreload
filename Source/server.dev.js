const express = require('express');
const LOCAL_HOST_PORT = 8001;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config');
const compiler = webpack(config);

const app = express();
app.use(express.static("static"));

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

const router = express.Router();
router.get('/', (_, res) => res.render("index"));
app.use(router);
app.listen(LOCAL_HOST_PORT, () => console.log('listening on port 8000'));