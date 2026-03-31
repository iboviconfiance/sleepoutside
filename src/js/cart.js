import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";
updateCartCount(); // Appelé dès que la page s'affiche

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // On vérifie si le panier existe et n'est pas vide
  if (cartItems && cartItems.length > 0) {
    // 1. Afficher les articles
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // 2. Calculer le Total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // 3. Afficher le pied de page et injecter le total
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide"); // On retire "hide" pour le montrer

    // On arrondit à 2 décimales pour éviter les bugs de centimes (ex: 19.99)
    document.querySelector(".cart-total").innerText =
      `Total: $${total.toFixed(2)}`;

    // Gestion des boutons de suppression (ton code existant)
    setupRemoveButtons();
  } else {
    // Si le panier est vide
    document.querySelector(".product-list").innerHTML =
      "<li>Votre panier est vide</li>";
    document.querySelector(".cart-footer").classList.add("hide"); // On cache le total
  }
}

// Fonction utilitaire pour les boutons (optionnel, pour garder le code propre)
function setupRemoveButtons() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      removeFromCart(productId);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}" title="Supprimer l'article">X</span>
  
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors.ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");

  const index = cartItems.findIndex((item) => item.Id === id);

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
