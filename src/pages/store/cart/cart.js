
import {getProducts, addCartItem, getCart, refreshCart} from "../payment"

let cart = getCart()
const productIds = Object.keys(cart)
const productData = await getItemData()

const availableHolder = document.querySelector("#available-section")
const preorderHolder = document.querySelector("#preorder-section")

const cartItemElement = document.querySelector("#cart-item")

for (const productId of productIds) {

    const product = productData[productId]
    if (!product) continue

    let clone = cartItemElement.content.cloneNode(true)

    let price = product["price"]
    let name = product["name"]
    let image = product["image"]
    let status = product["status"]
    let quantity = cart[productId]


    let titleElement = clone.querySelector(".cart-item-text-title")
    let priceElement = clone.querySelector(".cart-item-text-price")
    let quantityInput = clone.querySelector(".cart-quantity")
    let imageElement = clone.querySelector(".cart-item-photo")
    
    imageElement.src = image


    titleElement.textContent = name.toUpperCase()
    priceElement.textContent = `$ ${price}`   
    
    quantityInput = Number(quantity)

    let productElement = clone.querySelector(".cart-item")
    productElement.id = product["item_id"]
    productElement.setAttribute("price-id", product["price_id"])
    if (status === "in-stock") availableHolder.querySelector(".cart-item-holder").appendChild(clone)
    else preorderHolder.querySelector(".cart-item-holder").appendChild(clone)
    


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
        fetch(`${window.location.origin}/api/store/products?id=${productId}`).then(async (response) => [productId, await response.json()])
    );

    const data = await Promise.all(promises);
    return Object.fromEntries(data)
}