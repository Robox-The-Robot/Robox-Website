
import "../cross.webp"

import "../root.css"
import "./product.css"

// import { library, dom } from "@fortawesome/fontawesome-svg-core";


// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft"
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight"
// import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
// import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
// import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
// import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
// import {faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
// import {faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

import {getProducts, addCartItem, getCart, refreshCart} from "../payment"
refreshCart()

// library.add(faAngleLeft, faArrowRight, faTruckFast, faBookOpen, faAngleRight, faBars, faMinus, faPlus, faCartShopping);
// dom.watch()

const carouselImages = document.querySelectorAll(".carousel-image")
const heroImage = document.querySelector("#hero-image")

for (const carouselImage of carouselImages) {
    carouselImage.addEventListener("click", (e) => {
        let liElement = e.target.closest("li")
        changeHeroImage(Array.prototype.indexOf.call(liElement.parentNode.children, liElement))
    })
}

const heroNumber = document.getElementById("carousel-number")
const rightCarouselButton = document.getElementById("carousel-right-button")
const leftCarouselButton = document.getElementById("carousel-left-button")

rightCarouselButton.addEventListener("click", (e) => {
    if (rightCarouselButton.classList.contains("carousel-button-disabled")) return
    changeHeroImage(currentIndex+1)
})
leftCarouselButton.addEventListener("click", (e) => {
    if (leftCarouselButton.classList.contains("carousel-button-disabled")) return
    changeHeroImage(currentIndex-1)
})

let quantity = 1

const cartQuantityInput = document.getElementById("cart-quantity")
const increaseQuantityButton = document.getElementById("increase-cart-button")
const decreaseQuantityButton = document.getElementById("decrease-cart-button")

increaseQuantityButton.addEventListener("click", (e) =>{
    updateInputQuantity(quantity+1)
})
decreaseQuantityButton.addEventListener("click", (e) => {
    updateInputQuantity(quantity-1)
})
cartQuantityInput.addEventListener("input", (e) => {
    quantity = Number(cartQuantityInput.value)
    console.log(2)
})

function updateInputQuantity(amount) {
    console.log(amount)
    if (1 > amount) return
    quantity = amount
    cartQuantityInput.value = amount
    refreshCart()
}

const addToCartButton = document.getElementById("add-to-cart") 
addToCartButton.addEventListener("click", (e) => {
    addCartItem("test", quantity)
    refreshCart()
    updateInputQuantity(1)
    
})

let currentIndex = 0
changeHeroImage(currentIndex)
function changeHeroImage(number) {
    if (number === 0) leftCarouselButton.classList.add("carousel-button-disabled")
    else if (leftCarouselButton.classList.contains("carousel-button-disabled")) leftCarouselButton.classList.remove("carousel-button-disabled")
    if (number === carouselImages.length-1) rightCarouselButton.classList.add("carousel-button-disabled")
    else if (rightCarouselButton.classList.contains("carousel-button-disabled")) rightCarouselButton.classList.remove("carousel-button-disabled")
    const element = carouselImages[number].querySelector("img")
    let replacementURL = element.src
    heroNumber.textContent = `${number+1}\\${carouselImages.length}`
    heroImage.src = replacementURL

    carouselImages[currentIndex].querySelector("img").classList.remove("selected-carousel")
    element.classList.add("selected-carousel")
    currentIndex = number
}

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

window.matchMedia("(max-width: 900px)").addEventListener("change", (e) => {
    sidebarElement.close()
})