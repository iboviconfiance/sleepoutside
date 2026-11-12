import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartCount.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const listElement = document.querySelector(".product-list");
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index),
    );
    listElement.innerHTML = htmlItems.join("");
    listElement.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total span").textContent = `$${total.toFixed(2)}`;
    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    document.querySelector(".product-list").innerHTML =
      '<li class="cart-card"><p>Your cart is empty.</p></li>';
    document.querySelector(".cart-total span").textContent = "$0.00";
    document.querySelector(".cart-footer").classList.add("hide");
  }
  updateCartCount();
}

function removeCartItem(event) {
  const { id, index } = event.currentTarget.dataset;
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = Number(index);

  if (
    !Array.isArray(cartItems) ||
    !Number.isInteger(itemIndex) ||
    cartItems[itemIndex]?.Id !== id
  ) {
    return;
  }

  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button
    class="cart-card__remove"
    type="button"
    data-id="${item.Id}"
    data-index="${index}"
    aria-label="Remove ${item.Name} from cart"
  >
    X
  </button>
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
