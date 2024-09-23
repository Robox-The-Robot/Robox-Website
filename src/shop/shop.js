import "../root.css"
import "./shop.css"
import {getProducts, addCartItem, getCart, refreshCart} from "../payment"




refreshCart()
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