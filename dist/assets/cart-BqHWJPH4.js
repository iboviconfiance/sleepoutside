import{a as e,t}from"./utils-Y0raAJmM.js";function n(){let e=t(`so-cart`);if(!e||e.length===0){document.querySelector(`.product-list`).innerHTML=`<li>Votre panier est vide</li>`;return}let n=e.map(e=>r(e));document.querySelector(`.product-list`).innerHTML=n.join(``),document.querySelectorAll(`.cart-card__remove`).forEach(e=>{e.addEventListener(`click`,()=>{i(e.getAttribute(`data-id`))})})}function r(e){return`<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${e.Id}" title="Supprimer l'article">X</span>
  
  <a href="#" class="cart-card__image">
    <img
      src="${e.Image}"
      alt="${e.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${e.Name}</h2>
  </a>
  <p class="cart-card__color">${e.Colors.ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${e.FinalPrice}</p>
</li>`}function i(r){let i=t(`so-cart`),a=i.findIndex(e=>e.Id===r);a!==-1&&i.splice(a,1),e(`so-cart`,i),n()}n();