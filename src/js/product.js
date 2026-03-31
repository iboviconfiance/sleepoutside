import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./utils.mjs";
updateCartCount(); // Appelé dès que la page s'affiche

const dataSource = new ProductData("tents");

// 1. On récupère l'ID du produit depuis l'URL (ex: ?product=880RR)
const productId = getParam("product");

function renderProductDetails(product) {
  const discount = Math.round(
    product.SuggestedRetailPrice - product.FinalPrice,
  );

  document.getElementById("productBrandName").innerText = product.Brand.Name;
  document.getElementById("productName").innerText = product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;

  // Affichage du prix avec promo
  const priceElement = document.getElementById("productFinalPrice");
  if (discount > 0) {
    priceElement.innerHTML = `
      <span class="original-price">$${product.SuggestedRetailPrice}</span> 
      $${product.FinalPrice} 
      <span class="discount-amount">(-$${discount})</span>`;
  } else {
    priceElement.innerText = `$${product.FinalPrice}`;
  }

  document.getElementById("productColorName").innerText =
    product.Colors.ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
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

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);

  // MISE À JOUR ICI
  updateCartCount();
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
