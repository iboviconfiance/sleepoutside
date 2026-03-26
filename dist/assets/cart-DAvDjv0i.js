/* empty css              */ import { t as e } from "./utils-DVh8WDwu.js";
function t() {
  let t = e(`so-cart`).map((e) => n(e));
  document.querySelector(`.product-list`).innerHTML = t.join(``);
}
function n(e) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${e.Image}"
      alt="${e.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${e.Name}</h2>
  </a>
  <p class="cart-card__color">${e.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${e.FinalPrice}</p>
</li>`;
}
t();
