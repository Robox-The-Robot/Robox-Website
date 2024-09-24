export async function getProducts() {
    return await (await fetch("/shop/products")).json()
}
export function getCart() {
    let cart = sessionStorage.getItem("cart")
    if (!cart) {
        cart = JSON.stringify({quantity: 0})
        sessionStorage.setItem("cart", cart)

    }
    return (JSON.parse(cart))
}
export function refreshCart() {
    const cart = getCart()
    const cartElement = document.getElementById("cart")
    const cartProducts = cart ? Object.keys(cart) : []
    if (cartProducts.length !== 1) {
        cartElement.querySelector("p").innerHTML = `<span style=\"color: #FDFF9E; \">(</span>${cart["quantity"]}<span style=\"color: #FDFF9E;\">)</span>`
        cartElement.style.display = "flex"
    }
    else if (cartElement.style.display === "flex") {
        cartElement.style.display = "none"
    }

}
//expects an object of quantity and id
export function removeCartItem(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    cart["quantity"] -= cart[product]
    delete cart[product]
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()
}
export function wipeCart() {
    sessionStorage.setItem("cart", "{}")
    refreshCart()
}
export function addCartItem(product, quantity) {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    let item = cart[product]
    if (item) cart[product] = item + quantity
    else cart[product] = quantity
    if (!cart["quantity"] || cart["quantity"] && cart["quantity"] === 0) {
        cart["quantity"] = quantity
    }
    else {
        cart["quantity"] += quantity
    }
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()

}
export function setCartItem(product, quantity) {
    let cart = JSON.parse(sessionStorage.getItem("cart"))
    let item = cart[product]
    if (!cart["quantity"] || cart["quantity"] && cart["quantity"] === 0) {
        cart["quantity"] = quantity
    }
    else {
        cart["quantity"] += (quantity - item)
    }
    item = quantity
    
    sessionStorage.setItem("cart", JSON.stringify(cart))
    refreshCart()

}
