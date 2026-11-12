import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { updateCartCount } from './cartCount.mjs';

function productDetailsTemplate(product) {
  let discountHTML = '';
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountAmount = (
      product.SuggestedRetailPrice - product.FinalPrice
    ).toFixed(2);
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100,
    );
    discountHTML = `<span class="product-card__discount">${discountPercent}% OFF (Save $${discountAmount})</span>`;
  }

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice} ${discountHTML}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    if (!this.productId) {
      this.renderUnavailable();
      return;
    }

    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      this.renderUnavailable();
      return;
    }

    this.renderProductDetails('main');
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage('so-cart');
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    updateCartCount();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = productDetailsTemplate(this.product);
    }
  }

  renderUnavailable() {
    const element = document.querySelector('main');
    if (element) {
      element.innerHTML = '<p>Product not found.</p>';
    }
  }
}
