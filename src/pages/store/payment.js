//TODO: Remake this system (cache the product cost and get rid of weird funky quantity key)





export async function getProducts() {
    return await (await fetch("/api/store/products")).json()
}
export function getCart() {
    let cart = sessionStorage.getItem("cart")
    if (!cart) {
        cart = JSON.stringify({quantity: 0, products: {}})
        sessionStorage.setItem("cart", cart)
    }
    return JSON.parse(cart)
}
export function getItem(product) {
    let cart = getCart()
    return cart["products"][product]
}
export function refreshCart() {
    let cart = getCart()
    let quantity = 0
    let products = cart["products"]
    for (const product in products) {
        if (product == "" || !product) delete cart[product]
        else quantity += products[product]["quantity"]
    }
    cart["quantity"] = quantity
    const cartElement = document.getElementById("cart")
    if (cart["quantity"] > 0) {
        cartElement.querySelector("p").innerHTML = `<span style=\"color: #FDFF9E; \">(</span>${cart["quantity"]}<span style=\"color: #FDFF9E;\">)</span>`
        cartElement.style.display = "flex"
    }
    else if (cartElement.style.display === "flex") {
        cartElement.style.display = "none"
    }
}
//expects an object of quantity and id
export function removeCartItem(product) {
    let cart = getCart()
    cart["quantity"] -= cart["products"][product]["quantity"]
    delete cart["products"][product]
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()
}
export function wipeCart() {
    sessionStorage.setItem("cart", JSON.stringify({quantity: 0, products: {}}))
    refreshCart()
}
export function addCartItem(product, quantity, cache) {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    let item = cart["products"][product]
    if (item) item["quantity"] += quantity
    else {
        cart["products"][product] = {"quantity": quantity, "data": {}}
    }
    cart["products"][product]["data"] = cache
    cart["quantity"] += quantity
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()
}
export function setCartItem(product, quantity, cache) {
    let cart = getCart()
    let item = cart["products"][product]
    if (!item) {
        item = {"quantity": quantity, "data": cache}
    }
    else {
        cart["quantity"] -= item["quantity"]
        item["quantity"] = quantity
        item["data"] = cache
    }
    
    cart["quantity"] += quantity
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()
}
