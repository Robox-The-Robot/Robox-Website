const stripe = require('stripe')('sk_test_51PhrZEKQ7f0SWVUxdLCUYmqXzmCDJ4mjE5bBu2NtBUSn2hNG59ENIPCjYaol05OdJricajkdzKJeqoR9xuo7tC5E002AxPFEn1');

const express = require('express');
const paymentRouter = express.Router()

const DOMAIN = "http://localhost:3000";

paymentRouter.use(express.static('./dist'))


paymentRouter.get("/checkout", async (req, res) => {
    res.sendFile("view/checkout.html", { root: __dirname + "/dist/" })
})



paymentRouter.post("/checkout", async (req, res) => {
    //Validating the post data
    // let products = req.data.products
    // if (!products.length) return res.status(400)
    // for (const product of products) {
    //     if (!product["priceID"] || !product["quantity"]) return res.status(400)
    // }
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1PhrbiKQ7f0SWVUxBDc9P4Aj',
                quantity: 2,
            },
        ],
        mode: 'payment',
        return_url: `${DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
})

paymentRouter.get("/products", async (req, res) => {
    res.send(await getProductList())
})
paymentRouter.get("/products/:productId", async (req, res) => {
    let productId = req.params["productId"]
    if (productId === "quantity") return res.status(200).send(false)
    let product = await getProduct(productId)
    if (!product) return res.status(400);
    res.send(product)
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
        let price = await stripe.prices.retrieve(product.default_price)
        return {
            type: product.metadata.type,
            name: product.name,
            description: product.description,
            images: product.images,
            price: price.unit_amount / 100,
            status: product.metadata["status"],
        }
    }
    catch (err) {
        return false
    }
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
            price_id: prices.data[i].id,
            price: prices.data[i].unit_amount / 100,
            item_id: products.data[i].id,
            status: products.data[i].metadata["status"],
        });
    }
    return productList
}
module.exports = paymentRouter