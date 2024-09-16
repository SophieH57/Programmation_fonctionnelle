import { addFruits, displayStock, removeFruits, sellFruits } from "./utils";

const vendeur1 = {
  name: "vendeur1",
  stock: { pomme: 10, poire: 5, ananas: 8 },
};

addFruits(vendeur1, "pomme", 5);
addFruits(vendeur1, "citron", 8);
sellFruits(vendeur1, "ananas", 2);
console.log(displayStock(vendeur1));
removeFruits(vendeur1, "ananas");
console.log(displayStock(vendeur1));
