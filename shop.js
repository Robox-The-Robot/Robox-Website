import cache from 'memory-cache'
import { getProduct, getProductList, stripeAPI } from './stripe.js';


import express from 'express'
const paymentRouter = express.Router()

const DOMAIN = "http://localhost:3000";
const PRODUCT_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const verifiedProducts = await getProductList()


// paymentRouter.use(express.static('./dist'))

paymentRouter.post("/create", async (req, res) => {
    let products = req.body.products
    let expected_price = req.body.expected_price
    if (!products) return res.status(400).send({error: "Products is not defined"})
    let verifiedServerCost = 0
    for (const productId in products) {
        if (productId === "quantity") continue
        let product = verifiedProducts.filter((product) => product["item_id"] === productId)[0]
        let quantity = products[productId]["quantity"]
        if (!product) return res.status(400).send({
            error: "Product sent does not exist"
        })
        let itemCost = product["price"] * quantity
        verifiedServerCost += itemCost
    }
    verifiedServerCost *= 100
    if (expected_price !== verifiedServerCost) return res.status(400).send({
        error: "Server prices do not match the client prices"    
    })
    try {
        const paymentIntent = await stripeAPI.paymentIntents.create({
            amount: verifiedServerCost,
            currency: 'aud',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                products: JSON.stringify(products),
            }
        });
        res.json({client_secret: paymentIntent.client_secret});
    }
    catch (err) {
        console.log(err)
        res.status(500).send({error: err})
    }
})

paymentRouter.get("/products", async (req, res) => {
    if (req.query["id"]) {
        let productId = req.query["id"]
        if (productId === "quantity") return res.status(200).send(false)
        let cachedProduct = cache.get(productId)
        if (cachedProduct) return res.send(cachedProduct)
        let product = await getProduct(productId)
        if (!product) return res.status(400);
        cache.put(productId, product, PRODUCT_CACHE_DURATION);
        res.send(product)
    } else {
        let cachedProducts = cache.get('products');
        if (cachedProducts) return res.send(cachedProducts);

        let products = await getProductList();
        cache.put('products', products, PRODUCT_CACHE_DURATION);
        return res.send(products)
    }
})




export default paymentRouter