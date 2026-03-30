import{i as e,r as t}from"./utils-Y0raAJmM.js";import{t as n}from"./ProductData-BEye-AWU.js";function r(e){let t=Math.round(e.SuggestedRetailPrice-e.FinalPrice),n=t>0;return`<li class="product-card">
    <a href="product_pages/index.html?product=${e.Id}">
      <img src="${e.Image}" alt="Image of ${e.Name}">
      <h2 class="card__brand">${e.Brand.Name}</h2>
      <h3 class="card__name">${e.NameWithoutBrand}</h3>
      
      <p class="product-card__price">
        ${n?`<span class="original-price">$${e.SuggestedRetailPrice}</span>`:``}
        $${e.FinalPrice}
        ${n?`<span class="discount-badge">Save $${t}!</span>`:``}
      </p>
    </a>
  </li>`}new class{constructor(e,t,n){this.category=e,this.dataSource=t,this.listElement=n}async init(){let e=await this.dataSource.getData();this.renderList(e)}renderList(t){e(r,this.listElement,t)}}(`tents`,new n(`tents`),t(`.product-list`)).init();