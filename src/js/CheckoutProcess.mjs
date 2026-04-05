import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1, // Defaulting to 1 for now based on cart logic
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    if (!this.list) {
        this.list = [];
    }
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total dollar amount of the items in the cart
    const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);
    
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    // Initial display just for the subtotal
    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts
    // Tax: 6%
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    
    // Shipping: $10 for first item + $2 for each extra
    if (this.list.length > 0) {
      this.shipping = 10 + (this.list.length - 1) * 2;
    } else {
      this.shipping = 0;
    }
    
    // Total order value
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (tax) tax.innerText = `$${this.tax}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    
    // Add additional fields expected by the backend
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toString();
    json.tax = this.tax.toString();
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    
    console.log("Submitting JSON:", json);
    
    try {
      const res = await services.checkout(json);
      console.log("Checkout response:", res);
      alert("Comande soumise avec succès!");
    } catch (err) {
      console.log("Erreur durant le checkout:", err);
    }
  }
}
