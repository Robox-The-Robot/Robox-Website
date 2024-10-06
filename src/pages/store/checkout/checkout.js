import { getCart } from "../payment.js";
import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe('pk_test_51PhrZEKQ7f0SWVUxH1XgKKNh9FCSnLZpAre95yUs2ip95ktaarscGhTfiw4JQVTyCLrsCaW0xTeXIwcVbOUHFDba00b6ZWj5AT');
const elements = stripe.elements({
    mode: 'payment',
    amount: 200,
    currency: 'aud',
})
const addressElement = elements.create('address', {mode: "shipping"});
addressElement.mount('#address-element');
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

const cart = getCart()
const productIds = Object.keys(cart)
const productData = await getItemData()




let totalCost = 0
for (const productId of productIds) {
    if (productId === "quantity") continue
    let product = productData[productId]
    let cost = cart[productId] * product["price"]
    totalCost += cost
}
totalCost *= 100

const appearance = {

}



const clientSecret = await getPaymentIntent()
const options = {
    clientSecret: clientSecret,
};
elements.update(options);

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
                products: cart,
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
    const promises = productIds.map((productId) =>
        fetch(`${window.location.origin}/api/store/products?id=${productId}`).then(async (response) => [productId, await response.json()])
    );

    const data = await Promise.all(promises);
    return Object.fromEntries(data)
}



