import type { Order, OrderType, Pizza } from "./pizza-types";
import pizzasFromJson from "./pizzas.json";

import orderfromJson from "./orders.json";
import {
  calculateAverage,
  calculatePizzaPriceAverage,
  findPizzasWithoutMeat,
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

// console.log(orders);

console.log("Pizza without Meat");
console.log(findPizzasWithoutMeat(pizzasObjects));

console.log("price average");
console.log(calculatePizzaPriceAverage(pizzasObjects));
