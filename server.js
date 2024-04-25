const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(express.static('./dist/public'))


app.get("/", function (req, res) {
    console.log(1)
    res.sendFile("dash/index.html", { root: __dirname + "/src/" })
})

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
