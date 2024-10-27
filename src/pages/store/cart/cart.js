
import {getProducts, addCartItem, getCart, refreshCart, setCartItem, getItem} from "../payment.js"

let cart = getCart()
let products = cart["products"]
getItemData().then(serverProducts => {
    let reload = false
    for (const serverProductId in serverProducts) {
        if (JSON.stringify(serverProducts[serverProductId]) !== JSON.stringify(products[serverProductId]["data"])) {
            reload = true
            addCartItem(serverProductId, 0, serverProducts[serverProductId])
        }
    }
    if (reload) window.location.reload()
})

const availableHolder = document.querySelector("#available-section")
const preorderHolder = document.querySelector("#preorder-section")

const cartItemElement = document.querySelector("#cart-item")

const orderValueLabel = document.querySelector("#order-value-label")
const orderValue = document.querySelector("#order-value-value")
const itemisedList = document.querySelector("#itemised-list")
const totalValue = document.querySelector("#total-value")

const shippingCost = 100

//Calc is short for calculator chat
function renderCart() {
    cart = getCart()
    products = cart["products"]
    orderValueLabel.textContent = `Order value (${cart["quantity"]}) items:`
    
    let cost = 0
    itemisedList.replaceChildren();
    let productItemisationNode = document.createElement("li")
    productItemisationNode.appendChild(document.createElement("p"))
    productItemisationNode.appendChild(document.createElement("p"))
    console.log(products)
    for (const productId in products) {
        let product = products[productId]["data"]
        if (!product) continue;
        let price = product.price
        let quantity = products[productId]["quantity"]
        let cloneProductNode = productItemisationNode.cloneNode(true)
        cloneProductNode.firstChild.textContent = `${quantity} x ${product["name"].toUpperCase()}`
        cloneProductNode.lastChild.textContent = `$${price*quantity}`
        if (quantity === 0) {
            continue;
        }
        itemisedList.appendChild(cloneProductNode)
        cost += price*quantity
    }
    orderValue.textContent = `$${cost}`
    
    totalValue.innerHTML = `$${cost+shippingCost}<br><span style="font-size: x-small; color: grey;">(GST Included)</span>`
}

for (const productId in products) {

    const product = products[productId]["data"]
    if (!product || productId == "") continue
    let clone = cartItemElement.content.cloneNode(true)

    let price = product["price"]
    let name = product["name"]
    let image = product["image"]
    let status = product["status"]
    let quantity = products[productId]["quantity"]

    let titleElement = clone.querySelector(".cart-item-text-title")
    let priceElement = clone.querySelector(".cart-item-text-price")
    let quantityInput = clone.querySelector(".cart-quantity")
    let imageElement = clone.querySelector(".cart-item-photo")
    
    imageElement.src = `/public/images/${name.replaceAll(" ", "-").toLowerCase()}/thumbnail.jpg`


    titleElement.textContent = name.toUpperCase()
    priceElement.textContent = `$ ${price}`
    
    quantityInput.value = Number(quantity)

    let productElement = clone.querySelector(".cart-item")
    productElement.id = product["item_id"]
    productElement.setAttribute("price-id", product["price_id"])
    if (status === "in-stock") availableHolder.querySelector(".cart-item-holder").appendChild(clone)
    else preorderHolder.querySelector(".cart-item-holder").appendChild(clone)
}

renderCart()
const quantityButtons = document.querySelectorAll(".cart-quantity-button")
for (const quantityButton of quantityButtons) {
    let increaseButton = quantityButton.querySelector(".increase-cart-button")
    let decreaseButton = quantityButton.querySelector(".decrease-cart-button")
    let productId = quantityButton.closest(".cart-item").id
    let quantityElement = quantityButton.querySelector(".cart-quantity")
    quantityElement.addEventListener("input", (e) => {
        updateCart(productId, Number(quantityElement.value))
    })
    increaseButton.addEventListener("click", (e) => {
        updateCart(productId, Number(quantityElement.value)+1)
    })
    decreaseButton.addEventListener("click", (e) => {
        if (Number(quantityElement.value)-1 < 0) return
        updateCart(productId, Number(quantityElement.value)-1)
    })
}
function updateCart(product, quantity) {
    let productElement = document.getElementById(product)
    let quantityInput = productElement.querySelector(".cart-quantity")
    quantityInput.value = Number(quantity)
    setCartItem(product, Number(quantity), products[product]["data"])
    renderCart()
}


async function getItemData() {
    const promises = Object.keys(products).map((productId) =>
        fetch(`${window.location.origin}/api/store/products?id=${productId}`).then(async (response) => [productId, await response.json()])
    );

    const data = await Promise.all(promises);
    return Object.fromEntries(data)
}