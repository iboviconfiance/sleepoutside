import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document
  .querySelector("#zip-code")
  .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

document.forms["checkoutForm"].addEventListener("submit", (e) => {
  e.preventDefault();
  myCheckout.checkout(e.target);
});