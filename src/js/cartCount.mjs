import { getLocalStorage } from './utils.mjs';

export function updateCartCount() {
  const countElement = document.querySelector('.cart-count');
  if (!countElement) {
    return;
  }

  const cartItems = getLocalStorage('so-cart');
  const itemCount = Array.isArray(cartItems) ? cartItems.length : 0;
  countElement.textContent = itemCount;
  countElement.setAttribute('aria-label', `${itemCount} items in cart`);
}

updateCartCount();