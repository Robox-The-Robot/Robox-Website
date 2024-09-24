const express = require('express');

const payment = require("./stripe.js")

const app = express();

app.use("/public", express.static('./dist/public'))
app.use("/resources", express.static('./dist/resources'))
app.use("/guides", express.static("./dist/view/guides"))

app.use("/shop", payment)

app.get("/", function (req, res) {
    res.sendFile("view/home.html", { root: __dirname + "/dist/" })
})
app.get("/editor", function (req, res) {
    res.sendFile("view/editor/dashboard.html", { root: __dirname + "/dist/" })
})
app.get("/editor/workspace/:id", function(req, res) {
    res.sendFile("view/editor/workspace.html", { root: __dirname + "/dist/" })
})
app.get("/shop", function (req, res) {
    res.sendFile("view/shop.html", { root: __dirname + "/dist/" })
})
app.get("/shop/cart", function(req, res) {
    res.sendFile("view/cart.html", { root: __dirname + "/dist/" })
})
app.get("/shop/product/:productID", function(req, res) {
    res.sendFile("view/product.html", { root: __dirname + "/dist/" })
})
// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Robox website listening on port 3000!\n');
}); 
