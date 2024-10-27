

import {getProducts, addCartItem, getCart, refreshCart, dataEvent} from "../payment.js"

try { //VERY HACKY FIX BUT I NEED TO IMPORT THE FOLDER AND FOR SOME REASON THIS WORKS BUT ERRORS ON THE FRONT END
    import(`./robox-kit-1.0/${image}`)
    import(`./robox-kit-3.0/${image}`)
}
catch(err) {}
const productId = currentProduct["item_id"]


let carouselImages = document.querySelectorAll(".carousel-image")
const heroImage = document.querySelector("#hero-image")



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
})

function updateInputQuantity(amount) {
    if (1 > amount) return
    cartQuantityInput.value = amount
    quantity = Number(cartQuantityInput.value)
    refreshCart()
}

const addToCartButton = document.getElementById("add-to-cart") 
addToCartButton.addEventListener("click", (e) => {
    addCartItem(productId, quantity, currentProduct)
    refreshCart()
    updateInputQuantity(1)
})

document.addEventListener("DOMContentLoaded", (event) => {
    for (const image of images) {
        let listItem = document.createElement("li")
        listItem.classList.add("temp-image", "carousel-image")
        listItem.appendChild(image)
        imageCarousel.appendChild(listItem)
    }
    carouselImages = document.querySelectorAll(".carousel-image")
    changeHeroImage(currentIndex)
    for (const carouselImage of carouselImages) {
        carouselImage.addEventListener("click", (e) => {
            let liElement = e.target.closest("li")
            changeHeroImage(Array.prototype.indexOf.call(liElement.parentNode.children, liElement))
        })
    }
});

let currentIndex = 0

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