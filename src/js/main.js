import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";
updateCartCount(); // Appelé dès que la page s'affiche
import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// 1. On définit la source de données (tents)
const dataSource = new ExternalServices("tents");

// 2. On cible l'élément HTML où la liste doit s'afficher
const listElement = qs(".product-list");

// 3. On crée l'instance de ProductList et on l'initialise
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

const alertSystem = new Alert();
alertSystem.init();