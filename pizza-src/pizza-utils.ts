import type { Ingredient, Order, OrderType, Pizza } from "./pizza-types";

export const parseDate = (dateString: string): Date => new Date(dateString);

export const isMeat = (ingredient: string): boolean =>
  ingredient.includes("Jambon") || ingredient.includes("Saucisson");

export const isPizzaWithoutMeat = (pizza: Pizza): boolean =>
  pizza.ingredients.every((ingredient) => !isMeat(ingredient));

export const findPizzasWithoutMeat = (pizzaList: Pizza[]): Pizza[] =>
  pizzaList.filter((pizza) => {
    if (isPizzaWithoutMeat(pizza)) return pizza;
  });

export const calculateAverage = (numberList: number[]): number => {
  if (numberList.length === 0) return 0;

  const sum = numberList.reduce((acc, curr) => acc + curr, 0);
  return Math.round((sum / numberList.length) * 100) / 100;
};

export const calculatePizzaPriceAverage = (pizzaList: Pizza[]): number => {
  const prices = pizzaList.map((pizza) => pizza.price);
  return calculateAverage(prices);
};

export const getSumOrderedPizza = (
  orderList: Order[]
): Record<Pizza["name"], number> => {
  const nameAndNumberOrderPizza = {} as Record<Pizza["name"], number>;
  orderList.forEach((order) => {
    nameAndNumberOrderPizza[pizza.name] = Object.keys(
      nameAndNumberOrderPizza
    ).includes(pizza.name)
      ? (nameAndNumberOrderPizza[pizza.name] += 1)
      : 1;
  });
  return nameAndNumberOrderPizza;
};
// export const findMostOrderedPizza = (pizzaList: Pizza[]): Pizza["name"] => {

// };
