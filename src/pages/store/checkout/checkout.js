
import { getCart } from "../payment.js";
import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe('pk_test_51PhrZEKQ7f0SWVUxH1XgKKNh9FCSnLZpAre95yUs2ip95ktaarscGhTfiw4JQVTyCLrsCaW0xTeXIwcVbOUHFDba00b6ZWj5AT');


const appearance = {
    theme: "flat",
    variables: {
        spacingUnit: '4px',

    }
}


const cart = getCart()
const products = cart["products"]
const productData = await getItemData()




let totalCost = 0
for (const productId in products) {
    let product = productData[productId]
    let cost = products[productId]["quantity"] * product["price"]
    totalCost += cost
}
totalCost *= 100





const clientSecret = await getPaymentIntent()
const options = {
    clientSecret: clientSecret,
    appearance: appearance
};
const elements = stripe.elements(options)
const addressElement = elements.create('address', {mode: "shipping"});
addressElement.mount('#address-element');
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
paymentElement.on("loaderstart", (event) => {
    document.getElementById("spinner").style.display = "none"
    document.getElementById("stripe-content").style.justifyContent = "flex-start"
})

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {error} = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: 'https://www.google.com',
        },
    });

    if (error) {
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
    } 
    else {

    }
});
  

async function getPaymentIntent() {
    try {
        const clientSecret = await fetch("/api/store/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                products: products,
                expected_price: totalCost
            })
        });
        return (await clientSecret.json()).client_secret;
    }
    catch(err) {
        //do something with the error
        console.log(err)
    }
   
}
async function getItemData() {
    const promises = Object.keys(products).map((productId) =>
        fetch(`${window.location.origin}/api/store/products?id=${productId}`).then(async (response) => [productId, await response.json()])
    );

    const data = await Promise.all(promises);
    return Object.fromEntries(data)
}



