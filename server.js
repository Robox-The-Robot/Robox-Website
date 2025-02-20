import express from 'express'
const app = express();

import payment from "./shop.js"
app.use(express.json());


app.use("/api/store", payment);

app.use("/", express.static("./dist"))

// Serve the files on port 3000.
app.listen(80, function () {
    console.log('Robox website listening on port 80!\n');
}); 
app.listen(443, function () {
    console.log('Robox website listening on port 443!\n');
}); 
