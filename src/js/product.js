import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// 1. On récupère l'ID du produit depuis l'URL (ex: ?product=880RR)
const productId = getParam("product");

// 2. On crée une fonction pour afficher les détails du produit
function renderProductDetails(product) {
  document.getElementById("productBrandName").innerText = product.Brand.Name;
  document.getElementById("productName").innerText = product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productFinalPrice").innerText =
    `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerText =
    product.Colors.ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;

  // On ajoute l'ID au bouton pour que addToCartHandler sache quoi ajouter
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

// 3. On charge les données du produit et on les affiche
async function init() {
  if (productId) {
    const product = await dataSource.findProductById(productId);
    if (product) {
      renderProductDetails(product);
    }
  }
}

init();

// --- Le reste de ton code pour le panier (inchangé mais vérifié) ---

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems)) cartItems = [];

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
