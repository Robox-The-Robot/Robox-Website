const toastTemplate = document.querySelector("#toast-template")
const toastHolder = document.querySelector("#toast-holder")

export function createToast(header, text, type) {
    const clone = toastTemplate.content.cloneNode(true)
    const container = clone.querySelector(".toast")
    const iconHolder = clone.querySelector(".icon-holder")
    const toastText = clone.querySelector(".toast-text")
    const toastHeader = toastText.querySelector("h1")
    const toastBody = toastText.querySelector("p")

    toastBody.textContent = text
    toastHeader.textContent = header

    if (type === "negative") {
        iconHolder.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>`
        container.classList.add('negative-toast')
    }
    else {
        iconHolder.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
        
        container.classList.add('positive-toast')
    }
    toastHolder.appendChild(clone)
    setTimeout(() => {
        toastHolder.removeChild(container)
    }, 3000);

}
