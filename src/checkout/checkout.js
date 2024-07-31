const stripe = Stripe("pk_test_51PhrZEKQ7f0SWVUxH1XgKKNh9FCSnLZpAre95yUs2ip95ktaarscGhTfiw4JQVTyCLrsCaW0xTeXIwcVbOUHFDba00b6ZWj5AT")
const fetchClientSecret = async() => {
    const response = await fetch("/shop/checkout", {
        method: "POST"
    })
    const { clientSecret } = await response.json()
    return clientSecret
}
const init = async () => {
    const checkout = await stripe.initEmbeddedCheckout({ fetchClientSecret })
    console.log(document.getElementById("checkout"))
    checkout.mount('#checkout')
}
init()



