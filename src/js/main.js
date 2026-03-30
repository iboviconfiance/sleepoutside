// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

// 1. On définit la source de données (tents)
const dataSource = new ProductData("tents");

// 2. On cible l'élément HTML où la liste doit s'afficher
const listElement = qs(".product-list");

// 3. On crée l'instance de ProductList et on l'initialise
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
