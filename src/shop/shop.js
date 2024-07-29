import(/* webpackPrefetch: true */ "../cross.png");

import "../root.css"
import "./shop.css"
import "./shopImage/hero.jpg"

const productButtons = document.querySelectorAll(".product-button")
const cartModal = document.getElementById("cart-dialog")
for (const button of productButtons) {
    button.addEventListener("click", (event) => {
        cartModal.showModal()
    })
}
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
