import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  
  const discount = Math.round(product.SuggestedRetailPrice - product.FinalPrice);
  const hasDiscount = discount > 0;

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      
      <p class="product-card__price">
        ${hasDiscount ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>` : ""}
        $${product.FinalPrice}
        ${hasDiscount ? `<span class="discount-badge">Save $${discount}!</span>` : ""}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Récupère les données via ProductData.mjs
    const list = await this.dataSource.getData();
    
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}