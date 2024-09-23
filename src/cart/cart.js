import "../root.css"
import "./cart.css"
import {getProducts, addCartItem, getCart, refreshCart} from "../payment"

let cart = getCart()
const productIds = Object.keys(cart)
const productData = await getItemData()
console.log(productData)
for (const productId of productIds) {
    const product = productData[productId]
    let price = product["price"]
    let name = product["name"]
    let image = product["image"]
    let type = product["image"]
}


const quantityButtons = document.querySelectorAll(".cart-quantity-button")
for (const quantityButton of quantityButtons) {
    let itemId = quantityButton.getAttribute("item-id")
    let increaseButton = quantityButton.querySelector(".increase-cart-button")
    let decreaseButton = quantityButton.querySelector(".decrease-cart-button")

    increaseButton.addEventListener("click", (e) => {

    })
    decreaseButton.addEventListener("click", (e) => {
    })
}
async function getItemData() {
    const promises = productIds.map((productId) =>
        fetch(`http://localhost:3000/shop/products/${productId}`).then(async (response) => [productId, await response.json()])
    );

    const data = await Promise.all(promises);
    return Object.fromEntries(data)
}