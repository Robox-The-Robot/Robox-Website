import stripe from 'stripe'

const stripeAPI = stripe('sk_test_51PhrZEKQ7f0SWVUxdLCUYmqXzmCDJ4mjE5bBu2NtBUSn2hNG59ENIPCjYaol05OdJricajkdzKJeqoR9xuo7tC5E002AxPFEn1')
export async function getAllProducts() {
    const products = await stripeAPI.products.list();
    let has_more = products.has_more;
    while (has_more) {
        let moreProducts = await stripeAPI.products.list({
            starting_after: products.data[products.data.length - 1].id,
        });
        has_more = moreProducts.has_more;
        products.data.push(...moreProducts.data);
    }
    return products;
}
export async function getAllPrices() {
    const prices = await stripeAPI.prices.list();
    let has_more = prices.has_more;
    while (has_more) {
        let morePrices = await stripeAPI.prices.list({
            starting_after: prices.data[prices.data.length - 1].id,
        });
        has_more = morePrices.has_more;
        prices.data.push(...morePrices.data);
    }
    return prices;
}
export async function getProduct(id) {
    try {
        if (id === "quantity") return false
        let product = await stripeAPI.products.retrieve(id);
        let price = await stripeAPI.prices.retrieve(product.default_price)
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
export async function getProductList() {
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
