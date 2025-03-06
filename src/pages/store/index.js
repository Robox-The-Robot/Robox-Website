
import { createToast } from "../editor/workspace/alerts.js"
import {getProducts, addCartItem, getCart, refreshCart} from "./payment.js"




refreshCart()

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

const productButtons = document.querySelectorAll(".product-button")
for (const button of productButtons) {
    button.addEventListener("click", (event) => {
        let productData = allProducts.filter((product) => product.item_id === button.parentElement.id)[0]
        addCartItem(button.parentElement.id, 1, productData)
        createToast(`Item has been added to cart`, `${productData.name} has been added to cart`, "positive")
        event.stopImmediatePropagation()
    })
}