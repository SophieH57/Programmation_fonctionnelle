import type { Vendor } from "../types";
import { addFruits, displayStock, removeFruits, sellFruits } from "./utils";

const vendeur1 = {
  name: "vendeur1",
  stock: { pomme: 10, poire: 5, ananas: 8 },
};

const vendeur1AfterAdd5Pommes = addFruits(vendeur1, "pomme", 5);
console.log(vendeur1AfterAdd5Pommes.message);
console.log("vendeur1AfterAdd5Pommes", vendeur1AfterAdd5Pommes.vendor);
const vendeur1AfterAdd8Citrons = addFruits(vendeur1, "citron", 8);
console.log(vendeur1AfterAdd8Citrons.message);
console.log("vendeur1AfterAdd5Pommes", vendeur1AfterAdd8Citrons.vendor);
const vendeur1AfterSelling2Ananas = sellFruits(vendeur1, "ananas", 2);
console.log("vendeur1AfterSelling2Ananas", vendeur1AfterSelling2Ananas);
const vendeur1Stock = displayStock(vendeur1);
console.log(vendeur1Stock);
const vendeur1AfterRemoveAnanas = removeFruits(vendeur1, "ananas");
console.log(vendeur1AfterRemoveAnanas.message);
console.log("vendeur1AfterAdd5Pommes", vendeur1AfterRemoveAnanas.vendor);

// L'objet vendeur 1 n'a pas été modifié par les différentes fonctions:
console.log(vendeur1);
