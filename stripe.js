const stripe = require('stripe')('sk_test_51PhrZEKQ7f0SWVUxdLCUYmqXzmCDJ4mjE5bBu2NtBUSn2hNG59ENIPCjYaol05OdJricajkdzKJeqoR9xuo7tC5E002AxPFEn1');

const express = require('express');
const paymentRouter = express.Router()

paymentRouter.get("/products", async (req, res) => {
    res.send(await getProductList())
})

async function getAllProducts() {
    const products = await stripe.products.list();
    let has_more = products.has_more;
    while (has_more) {
        let moreProducts = await stripe.products.list({
            starting_after: products.data[products.data.length - 1].id,
        });
        has_more = moreProducts.has_more;
        products.data.push(...moreProducts.data);
    }
    return products;
}
async function getAllPrices() {
    const prices = await stripe.prices.list();
    let has_more = prices.has_more;
    while (has_more) {
        let morePrices = await stripe.prices.list({
            starting_after: prices.data[prices.data.length - 1].id,
        });
        has_more = morePrices.has_more;
        prices.data.push(...morePrices.data);
    }
    return prices;
}
async function getProduct(id) {
    try {
        let product = await stripe.products.retrieve(id);
        return product;
    }
    catch (err) {
        return false
    }
}
async function createPaymentIntent(options) {
    const paymentIntent = await stripe.paymentIntents.create(options);
    return paymentIntent;
}
async function getProductList() {
    let products = await getAllProducts();
    let prices = await getAllPrices();
    let productList = [];
    for (let i = 0; i < products.data.length; i++) {
        productList.push({
            type: products.data[i].metadata.type,
            name: products.data[i].name,
            description: products.data[i].description,
            images: products.data[i].images,
            price: prices.data[i].unit_amount / 100,
            item_id: products.data[i].id,
        });
    }
    return productList
}
async function getPrice(id) {
    try {
        let price = await stripe.prices.retrieve(id);
        return price.unit_amount / 100;
    }
    catch (err) {
        return false
    }
}
module.exports = paymentRouter