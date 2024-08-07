import(/* webpackPrefetch: true */ "../cross.png");
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

import "../root.css"
import "./shop.css"
import "./shopImage/hero.jpg"
import {getProducts, addCartItem, getCart} from "../payment"



const cart = getCart()
const cartElement = document.getElementById("cart")
const cartProducts = cart ? Object.keys(cart) : []
if (cartProducts.length !== 1) {
    cartElement.querySelector("p").innerHTML = `<span style=\"color: #FDFF9E; \">(</span>${cart["quantity"]}<span style=\"color: #FDFF9E;\">)</span>`
    cartElement.style.display = "flex"
}


const cartModal = document.getElementById("cart-dialog")

const continueShoppingButton = document.getElementById("continue-button")
continueShoppingButton.addEventListener("click", (event) => {
    cartModal.close()
})
const modals = document.querySelectorAll("dialog")
for (const modal of modals) {
    modal.addEventListener("click", (event) => {
        let rect = event.target.getBoundingClientRect();
        if (rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            modal.close();
        }
    })
}
let products = await getProducts()

const productTemplate = document.getElementById("product-template")
const productHolder = document.getElementById("product-holder")
async function populateProducts() {
    for (const product of products) {
        let clone = productTemplate.content.cloneNode(true)
        let title = clone.querySelector(".product-name")
        let status = clone.querySelector(".product-status")
        let price = clone.querySelector(".product-price")
        let productButton = clone.querySelector(".product-button")
        title.textContent = product["name"].toUpperCase()
        price.textContent = `$ ${product["price"]}`   
        let productElement = clone.querySelector(".product")
        productElement.id = product["item_id"]
        productElement.setAttribute("price-id", product["price_id"])

        productHolder.appendChild(clone)
    }
    const productButtons = document.querySelectorAll(".product-button")
    for (const button of productButtons) {
        button.addEventListener("click", (event) => {
            addCartItem(button.parentElement.id, 1)
            cartModal.showModal()
        })
    }
    
}
populateProducts()