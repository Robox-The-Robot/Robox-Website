
import "../cross.webp"

import "../root.css"
import "./product.css"

import { library, dom } from "@fortawesome/fontawesome-svg-core";


import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"




library.add(faAngleLeft, faArrowRight, faTruckFast, faBookOpen, faAngleRight);
dom.watch()

const carouselImages = document.querySelectorAll(".carousel-image")
const heroImage = document.querySelector("#hero-image")
let currentImage = carouselImages[0]
changeHeroImage({target: carouselImages[0]})
for (const carouselImage of carouselImages) {
    carouselImage.addEventListener("click", changeHeroImage)
    
}
function changeHeroImage(event) {
    const element = event.target
    const elementImage = element.querySelector("img") ?? element
    let replacementURL = elementImage.src
    heroImage.src = replacementURL
    currentImage.classList.remove("selected-carousel")
    element.classList.add("selected-carousel")
    currentImage = element
}
