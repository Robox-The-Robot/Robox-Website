const express = require('express');

const payment = require("./stripe.js")

const app = express();

app.use("/public", express.static('./dist/public'))
app.use("/resources", express.static('./dist/resources'))
app.use("/guides", express.static("./src/guides")) // TODO: Publish via webpack?

app.use("/shop", payment)

app.get("/", function (req, res) {
    res.sendFile("view/home.html", { root: __dirname + "/dist/" })
})
app.get("/workspace", function (req, res) {
    res.sendFile("view/dash.html", { root: __dirname + "/dist/" })
})
app.get("/shop", function (req, res) {
    res.sendFile("view/shop.html", { root: __dirname + "/dist/" })
})
app.get("/workspace/:id", function(req, res) {
    res.sendFile("view/workspace.html", { root: __dirname + "/dist/" })
})
app.get("/shop/cart", function(req, res) {
    res.sendFile("view/cart.html", { root: __dirname + "/dist/" })
})
app.get("/shop/product/:productID", function(req, res) {
    res.sendFile("view/product.html", { root: __dirname + "/dist/" })
})
// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
}); 
