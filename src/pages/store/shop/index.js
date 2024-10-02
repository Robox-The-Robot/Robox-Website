
import {getProducts, addCartItem, getCart, refreshCart} from "../payment.js"




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

const productButtons = document.querySelectorAll(".product-button")
for (const button of productButtons) {
    button.addEventListener("click", (event) => {
        addCartItem(button.parentElement.id, 1)
        cartModal.showModal()
        event.stopImmediatePropagation()
    })
}