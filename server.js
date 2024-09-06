const express = require('express');
const webpack = require('webpack');
const path = require('path');

const payment = require("./stripe.js")

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(express.static('./dist'))

app.use("/shop", payment)


app.get("/", function (req, res) {
    res.sendFile("view/dash.html", { root: __dirname + "/dist/" })
})
app.get("/shop", function (req, res) {
    res.sendFile("view/shop.html", { root: __dirname + "/dist/" })
})
app.get("/workspace/:id", function(req, res) {
    res.sendFile("view/workspace.html", { root: __dirname + "/dist/" })
})
app.get("/cart/", function(req, res) {
    res.sendFile("view/cart.html", { root: __dirname + "/dist/" })
})
app.get("/shop/product/:productID", function(req, res) {
    res.sendFile("view/product.html", { root: __dirname + "/dist/" })
})
// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
}); 
