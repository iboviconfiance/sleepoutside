import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1. Récupérer le contenu actuel du panier (ou un tableau vide si rien n'existe)
  let cartItems = getLocalStorage("so-cart");
  
  // 2. Vérifier si cartItems est bien un tableau (parfois getLocalStorage peut retourner autre chose)
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // 3. Ajouter le nouveau produit au tableau existant
  cartItems.push(product);

  // 4. Sauvegarder le tableau complet mis à jour
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
