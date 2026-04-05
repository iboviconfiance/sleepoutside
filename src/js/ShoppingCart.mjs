import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const productUrl = `/product_pages/index.html?product=${item.Id}`;
  return `<li class="cart-card divider">
    <a href="${productUrl}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="${productUrl}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors.ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentElement) {
    this.key = key;
    this.parentElement = parentElement;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    this.parentElement.innerHTML = htmlItems.join("");
  }
}