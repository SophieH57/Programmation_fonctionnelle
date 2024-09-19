import { log } from "console";
import type { Ingredient, Order, Pizza } from "./pizza-types";

export const parseDate = (dateString: string): Date => new Date(dateString);

export const isMeat = (ingredient: string): boolean =>
  ingredient.includes("Jambon") || ingredient.includes("Saucisson");

export const isPizzaWithoutMeat = (pizza: Pizza): boolean =>
  pizza.ingredients.every((ingredient) => !isMeat(ingredient));

// export const findPizzasWithoutMeat = (pizzaList: Pizza[]): Pizza[] =>
//   pizzaList.filter((pizza) => {
//     if (isPizzaWithoutMeat(pizza)) return pizza;
//   });

// Retourne l'aggrégation d'une propriété cible d'une liste d'objet
export const getMapOfObjectParam = <T, K extends keyof T>(
  objectList: T[],
  param: K
): T[K][] => {
  return objectList.flatMap((obj) => obj[param]);
};

// Calcule la moyenne d'un tableau de nombres
export const calculateAverage = (numberList: number[]): number => {
  if (numberList.length === 0) return 0;

  const sum = numberList.reduce((acc, curr) => acc + curr, 0);
  return Math.round((sum / numberList.length) * 100) / 100;
};

// Retourne un objet dont les clés sont les ids des pizzas et les valeurs sont le total des pizzas dans la commande
export const getPizzasIdFromOrder = (order: Order): Record<string, number> => {
  const pizzasInOrder = {} as Record<string, number>;
  order.items.forEach(
    (pizza) =>
      (pizzasInOrder[pizza.pizzaId] = Object.keys(pizzasInOrder).includes(
        pizza.pizzaId
      )
        ? pizzasInOrder[pizza.pizzaId] + pizza.quantity
        : pizza.quantity)
  );
  return pizzasInOrder;
};

// Avec un id de pizza, retourne son nom
export const getPizzaName = (pizzaId: string, pizzaList: Pizza[]): Pizza =>
  pizzaList.filter((pizza) => pizza.id === pizzaId)[0];

// Retourne le nombre de valeur unique d'une propriété dans une liste d'objet
export const countUniqueValuesByKey = <T>(
  objectList: T[],
  param: keyof T
): number => {
  const values = getMapOfObjectParam(objectList, param);
  const uniqueValues = new Set(values);
  return uniqueValues.size;
};

// Retourne le nombre d'objet d'une liste dont une propriété a une valeur cible
export const getObjectsWithTargetElement = <T>(
  objectList: T[],
  param: keyof T,
  target: string
): T[] => {
  const objectsWithTarget = objectList.filter((obj) => obj[param] === target);
  return objectsWithTarget;
};

// Retourne le nombre d'ingrédient utilisé dans une seule recette
export const findUniqueIngredients = (pizzaList: Pizza[]): string[] => {
  const allIngredients = getMapOfObjectParam(pizzaList, "ingredients");
  const ingredientCount = allIngredients.reduce<Record<string, number>>(
    (count, ingredient) => {
      count[ingredient.toString()] = (count[ingredient.toString()] || 0) + 1;
      return count;
    },
    {}
  );
  const uniqueIngredients = Object.keys(ingredientCount).filter(
    (ingredient) => ingredientCount[ingredient] === 1
  );
  return uniqueIngredients;
};

// export const findPizzaWithNumberOfIngredients = (
//   pizzaList: Pizza[],
//   numberofIngredients: number
// ): number => {
//   const pizzas = pizzaList.filter(
//     (pizza) => pizza.ingredients.length < numberofIngredients
//   );
//   return pizzas.length;
// };

export const findObjectWithFilter = <T>(
  objectList: T[],
  condition: (obj: T) => boolean
) => {
  return objectList.filter(condition);
};

export const findPizzaWhereNotSold = (
  pizzaList: Pizza[],
  ordersList: Order[]
): string[] => {
  const pizzasInOrders = ordersList.flatMap((order) =>
    order.items.flatMap((item) => item.pizzaId)
  );
  const pizzasIds = getMapOfObjectParam(pizzaList, "id");
  const pizzaNotSoldIds = findObjectWithFilter(
    pizzasIds,
    (pizza) => !pizzasInOrders.includes(pizza)
  );
  const pizzas = pizzaNotSoldIds.map((pizza) => getPizzaName(pizza, pizzaList));
  return pizzas.map((pizza) => pizza.name);
};

export const getAverageAmountOfOrders = (ordersList: Order[]): number => {
  const ordersAmountMap = getMapOfObjectParam(ordersList, "totalAmount");
  const averageOfAmount = calculateAverage(ordersAmountMap);
  return averageOfAmount;
};

export const getAveragePriceofPizzaWithTomatoBase = (
  pizzaList: Pizza[]
): number => {
  const pizzasBaseTomato = getObjectsWithTargetElement(
    pizzaList,
    "base",
    "Tomate"
  );
  const pricesOfPizzaWithTomatoBase = getMapOfObjectParam(
    pizzasBaseTomato,
    "price"
  );
  const average = calculateAverage(pricesOfPizzaWithTomatoBase);
  return average;
};

export const getPizzaCountById = (orders: Order[]): Record<string, number> => {
  return orders.reduce<Record<string, number>>((acc, order) => {
    order.items.forEach((item) => {
      acc[item.pizzaId] = (acc[item.pizzaId] || 0) + item.quantity;
    });
    return acc;
  }, {});
};

export const getKeyOfMaxValue = (obj: Record<string, number>): string => {
  return Object.entries(obj).reduce((maxKey, [key, value]) => {
    return obj[maxKey] > value ? maxKey : key;
  }, Object.keys(obj)[0]);
};

export const getNameOfPizzaMostSold = (
  orders: Order[],
  pizzaList: Pizza[]
): string => {
  const pizzaByIdAndQuantitySold = getPizzaCountById(orders);
  const pizzaMostSoldId = getKeyOfMaxValue(pizzaByIdAndQuantitySold);
  const pizza = getPizzaName(pizzaMostSoldId, pizzaList);
  return pizza.name;
};

export const getAverageOfPizzasInOrder = (orderList: Order[]): number => {
  const numberOfPizza = orderList.map((order) =>
    order.items.reduce((sum, item) => {
      return (sum += item.quantity);
    }, 0)
  );
  const getAverageOfPizzaInOrder = calculateAverage(numberOfPizza);
  return getAverageOfPizzaInOrder;
};

export const getUnusedIngredients = (
  orderList: Order[],
  pizzaList: Pizza[]
): string[] => {
  const pizzaIdFromOrders = orderList.flatMap((order) =>
    order.items.flatMap((item) => item.pizzaId)
  );
  const uniquePizzaIds = [...new Set(pizzaIdFromOrders)];
  const allIngredients = pizzaList.flatMap((pizza) => pizza.ingredients);
  const uniqueIngredients = [...new Set(allIngredients)];

  const ingredientsUsedInOrderedPizza = pizzaList
    .filter((pizzaId) => uniquePizzaIds.includes(pizzaId.id))
    .flatMap((pizza) => pizza.ingredients);
  const unusedIngredients = uniqueIngredients.filter(
    (ingredient) => !ingredientsUsedInOrderedPizza.includes(ingredient)
  );
  return unusedIngredients;
};
