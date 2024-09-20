import type { ItemType, Order, Pizza } from "./pizza-types";
import pizzasFromJson from "./pizzas.json";

import orderfromJson from "./orders.json";
import {
  calculateAverage,
  calculateAverageDeliveryCosts,
  calculateAveragePreparationTime,
  countUniqueValuesByKey,
  findObjectWithFilter,
  findPizzaWhereNotSold,
  findPizzaWhichHadBeenOrderedOnce,
  findUniqueIngredients,
  getAverageAmountOfOrders,
  getAverageOfPizzasInOrder,
  getAveragePriceofPizzaWithTomatoBase,
  getMapOfObjectParam,
  getNameOfPizzaMostSold,
  getObjectsWithTargetElement,
  getPizzasIdFromOrder,
  getUnusedIngredients,
  isPizzaWithoutMeat,
  parseDate,
} from "./pizza-utils";

const pizzasObjects = pizzasFromJson.map((pizza) => pizza as Pizza);
// console.log(pizzasObjects);

const orders: Order[] = orderfromJson.map((order) => {
  return {
    ...order,
    orderedAt: parseDate(order.orderedAt),
    readyAt: parseDate(order.readyAt),
    items: order.items.map((item) => ({
      ...item,
      pizzaId: item.pizzaId,
    })),
  } as Order;
});

console.log(orders);

console.log("Pizza without Meat");
console.log(
  findObjectWithFilter(pizzasObjects, (pizza) => isPizzaWithoutMeat(pizza))
);

console.log("price average");
const pizzasPriceAverageMap = getMapOfObjectParam(pizzasObjects, "price");
const averagePrice = calculateAverage(pizzasPriceAverageMap);
console.log(averagePrice);

console.log("1. Combien de bases de pizzas différentes compte le menu ?");
console.log(countUniqueValuesByKey(pizzasObjects, "base"));

console.log("2. Combien de recettes de pizzas sont à base de tomate.");
console.log(
  getObjectsWithTargetElement(pizzasObjects, "base", "Tomate").length
);

console.log("3. Combien d'ingrédients sont proposés ?");
console.log(countUniqueValuesByKey(pizzasObjects, "ingredients"));

console.log("4. Quel ingrédient est présent dans une seule recette ?");
console.log(findUniqueIngredients(pizzasObjects));

console.log(
  "5. Combien de recettes de pizza comptent moins de 4 ingrédients ?"
);
console.log(
  findObjectWithFilter(pizzasObjects, (pizza) => pizza.ingredients.length < 4)
    .length
);

console.log("6. Quelle recette de pizza n'a jamais été vendue ?");
console.log(findPizzaWhereNotSold(pizzasObjects, orders));

console.log("7. Quel est le montant moyen des commandes de pizzas ?");
console.log(getAverageAmountOfOrders(orders));

console.log("8. Quel est le prix moyen des pizzas à base de tomate ?");
console.log(getAveragePriceofPizzaWithTomatoBase(pizzasObjects));

console.log("9. Combien de recettes de pizzas ne contiennent pas de viande ?");
console.log(
  findObjectWithFilter(pizzasObjects, (pizza) => isPizzaWithoutMeat(pizza))
    .length
);

console.log("10. Quelle recette de pizza a été la plus vendue ?");
console.log(getNameOfPizzaMostSold(orders, pizzasObjects));

console.log("11. En moyenne, combien de pizzas contient une commande ?");
console.log(getAverageOfPizzasInOrder(orders));

console.log(
  "12. Quels ingrédients n'ont pas été utilisés dans les pizzas vendues ?"
);
console.log(getUnusedIngredients(orders, pizzasObjects));

console.log(
  "13. Combien de recettes de pizzas ont été commandées une seule fois ?"
);
console.log(findPizzaWhichHadBeenOrderedOnce(orders, pizzasObjects));

console.log(
  "14. Combien de minutes dure en moyenne la préparation d'une commande ?"
);
console.log(calculateAveragePreparationTime(orders));

console.log(
  "15. Quel est le montant moyen des frais de livraison pour les commandes de pizzas à emporter ?"
);
console.log(calculateAverageDeliveryCosts(orders));
