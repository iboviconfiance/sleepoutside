import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
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

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice} ${discountHTML}</p>
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
    const list = await this.dataSource.getData();
    const filteredList = this.filterProducts(list);
    this.renderList(filteredList);
  }

  filterProducts(list) {
    const allowedIds = ['880RR', '985RF', '985PR', '344YJ'];
    return list.filter((product) => allowedIds.includes(product.Id));
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
