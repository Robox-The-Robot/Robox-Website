import cache from 'memory-cache'
import { getProduct, getProductList } from './stripe.js';


import express from 'express'
const paymentRouter = express.Router()

const DOMAIN = "http://localhost:3000";
const PRODUCT_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// paymentRouter.use(express.static('./dist'))

// paymentRouter.post("/api/store/checkout", async (req, res) => {
//     //Validating the post data
//     // let products = req.data.products
//     // if (!products.length) return res.status(400)
//     // for (const product of products) {
//     //     if (!product["priceID"] || !product["quantity"]) return res.status(400)
//     // }
//     const session = await stripe.checkout.sessions.create({
//         ui_mode: 'embedded',
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: 'price_1PhrbiKQ7f0SWVUxBDc9P4Aj',
//                 quantity: 2,
//             },
//         ],
//         mode: 'payment',
//         return_url: `${DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
//     });

//     res.send({ clientSecret: session.client_secret });
// })

paymentRouter.get("/api/store/products", async (req, res) => {
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