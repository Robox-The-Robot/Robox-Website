const express = require('express');
const app = express();

const payment = require("./stripe.js")
app.use(payment);

app.use("/", express.static("./dist"))

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Robox website listening on port 3000!\n');
}); 
