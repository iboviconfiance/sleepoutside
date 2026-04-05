import{a as e,o as t,t as n}from"./utils-QQsu8xjC.js";t();function r(){let e=n(`so-cart`);if(e&&e.length>0){let t=e.map(e=>a(e));document.querySelector(`.product-list`).innerHTML=t.join(``);let n=e.reduce((e,t)=>e+t.FinalPrice,0);document.querySelector(`.cart-footer`).classList.remove(`hide`),document.querySelector(`.cart-total`).innerText=`Total: $${n.toFixed(2)}`,i()}else document.querySelector(`.product-list`).innerHTML=`<li>Votre panier est vide</li>`,document.querySelector(`.cart-footer`).classList.add(`hide`)}function i(){document.querySelectorAll(`.cart-card__remove`).forEach(e=>{e.addEventListener(`click`,()=>{o(e.getAttribute(`data-id`))})})}function a(e){return`<li class="cart-card divider">
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
</li>`}function o(t){let i=n(`so-cart`),a=i.findIndex(e=>e.Id===t);a!==-1&&i.splice(a,1),e(`so-cart`,i),r()}r();