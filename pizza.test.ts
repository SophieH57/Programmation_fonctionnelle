import { expect, test } from "bun:test";
import {
  calculateAverage,
  countUniqueValuesByKey,
  findObjectWithFilter,
  findPizzaWhereNotSold,
  findUniqueIngredients,
  getKeyOfMaxValue,
  getMapOfObjectParam,
  getObjectsWithTargetElement,
  getPizzaName,
  getPizzasIdFromOrder,
  isMeat,
  isPizzaWithoutMeat,
  parseDate,
} from "./pizza-src/pizza-utils";
import type { Ingredient } from "./pizza-src/pizza-types";

test("isMeat", () => {
  const ingredient = "Jambon cru";
  expect(isMeat(ingredient)).toBeTrue();
});

test("isMeat", () => {
  const ingredient = "Poivrons";
  expect(isMeat(ingredient)).toBeFalse();
});

test("isPizzaWithoutMeat : true", () => {
  const vegPizza = {
    id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
    name: "Ortolana",
    price: 12,
    base: "Tomate",
    ingredients: [
      "Mozzarella",
      "Champignons",
      "Olives Vertes",
      "Coeurs d'Artichaut",
      "Olives Noires",
      "Poivrons",
      "Courgettes",
      "Basilic",
      "Aubergines",
    ] as Ingredient[],
  };
  expect(isPizzaWithoutMeat(vegPizza)).toBeTrue();
});

test("isPizzaWithoutMeat :  false", () => {
  const vegPizza = {
    id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
    name: "Diavola",
    price: 10,
    base: "Tomate",
    ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
  };
  expect(isPizzaWithoutMeat(vegPizza)).toBeFalse();
});

test("findPizzasWithoutMeat", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
  ];
  expect(
    findObjectWithFilter(pizzaList, (pizza) => isPizzaWithoutMeat(pizza))
  ).toMatchObject([
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
  ]);
});

test("calculateAverage", () => {
  const numbers = [1, 2, 3];
  expect(calculateAverage(numbers)).toBe(2);
});

test("calculateAverage, with coma", () => {
  const numbers = [4, 2, 1, 2];
  expect(calculateAverage(numbers)).toBe(2.25);
});

test("getPizzasIdFromOrder", () => {
  const order = {
    id: "c0b171c5-a367-40ee-9aaa-ff8fde58d3c0",
    orderedAt: parseDate("2024-09-15 20:40:00"),
    readyAt: parseDate("2024-09-15 20:54:00"),
    orderType: "Delivery",
    status: "Completed",
    amount: 46,
    totalAmount: 51,
    items: [
      {
        pizzaId: "6e7c919d-ee62-4ecc-9d24-0a4663732d1f",
        quantity: 2,
        price: 11,
        amount: 22,
      },
      {
        pizzaId: "b16d234d-dc7b-4610-bbe2-f4fd250869dd",
        quantity: 2,
        price: 12,
        amount: 24,
      },
    ],
    deliveryCosts: 5,
  };
  expect(getPizzasIdFromOrder(order)).toMatchObject({
    "6e7c919d-ee62-4ecc-9d24-0a4663732d1f": 2,
    "b16d234d-dc7b-4610-bbe2-f4fd250869dd": 2,
  });
});

test("getPizzaName", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
  ];
  const pizzaId = "e9f2f06b-030a-4526-bc26-652fe1bf446b";
  expect(getPizzaName(pizzaId, pizzaList)).toMatchObject({
    id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
    name: "Diavola",
    price: 10,
    base: "Tomate",
    ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
  });
});

test("getMostOrderedPizzas", () => {
  const obj = {
    "6e7c919d-ee62-4ecc-9d24-0a4663732d1f": 5,
    "b16d234d-dc7b-4610-bbe2-f4fd250869dd": 2,
  };
  expect(getKeyOfMaxValue(obj)).toBe("6e7c919d-ee62-4ecc-9d24-0a4663732d1f");
});

test("countUniqueValuesByKey", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
    {
      id: "b16d234d-dc7b-4610-bbe2-f4fd250869dd",
      name: "Rucola",
      price: 12,
      base: "Nature",
      ingredients: ["Parmesan", "Jambon Cru", "Roquette"] as Ingredient[],
    },
  ];
  expect(countUniqueValuesByKey(pizzaList, "base")).toBe(2);
});

test("countSumOfPizzaWithElement", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
    {
      id: "b16d234d-dc7b-4610-bbe2-f4fd250869dd",
      name: "Rucola",
      price: 12,
      base: "Nature",
      ingredients: ["Parmesan", "Jambon Cru", "Roquette"] as Ingredient[],
    },
  ];
  expect(getObjectsWithTargetElement(pizzaList, "base", "Tomate").length).toBe(
    2
  );
});

test("countUniqueValuesInArray", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
    {
      id: "b16d234d-dc7b-4610-bbe2-f4fd250869dd",
      name: "Rucola",
      price: 12,
      base: "Nature",
      ingredients: ["Parmesan", "Jambon Cru", "Roquette"] as Ingredient[],
    },
  ];
  expect(countUniqueValuesByKey(pizzaList, "ingredients")).toBe(13);
});

test("findUniqueIngredients", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: ["Mozzarella"] as Ingredient[],
    },
  ];
  expect(findUniqueIngredients(pizzaList)).toMatchObject(["Saucisson Piquant"]);
});

test("findPizzaWithNumberOfIngredients", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b",
      name: "Diavola",
      price: 10,
      base: "Tomate",
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758",
      name: "Ortolana",
      price: 12,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Champignons",
        "Olives Vertes",
        "Coeurs d'Artichaut",
        "Olives Noires",
        "Poivrons",
        "Courgettes",
        "Basilic",
        "Aubergines",
      ] as Ingredient[],
    },
    {
      id: "b16d234d-dc7b-4610-bbe2-f4fd250869dd",
      name: "Rucola",
      price: 12,
      base: "Nature",
      ingredients: ["Parmesan", "Jambon Cru", "Roquette"] as Ingredient[],
    },
  ];
  expect(
    findObjectWithFilter(pizzaList, (pizza) => pizza.ingredients.length < 4)
      .length
  ).toBe(2);
});

test("findPizzaWhereNotSold", () => {
  const orders = [
    {
      id: "1b50f90d-cd69-4db8-8563-fa7e06cb87db",
      orderedAt: parseDate("2024-09-15 20:40:00"),
      readyAt: parseDate("2024-09-15 20:51:00"),
      orderType: "Delivery",
      status: "Completed",
      amount: 14,
      totalAmount: 23,
      items: [
        {
          pizzaId: "d088b172-ec12-44c9-8ca2-1d7096204316",
          quantity: 2,
          price: 7,
          amount: 14,
        },
      ],
      deliveryCosts: 9,
    },
    {
      id: "c0b171c5-a367-40ee-9aaa-ff8fde58d3c0",
      orderedAt: parseDate("2024-09-15 20:40:00"),
      readyAt: parseDate("2024-09-15 20:54:00"),
      orderType: "Delivery",
      status: "Completed",
      amount: 46,
      totalAmount: 51,
      items: [
        {
          pizzaId: "6e7c919d-ee62-4ecc-9d24-0a4663732d1f",
          quantity: 2,
          price: 11,
          amount: 22,
        },
      ],
      deliveryCosts: 5,
    },
  ];
  const pizzas = [
    {
      id: "d088b172-ec12-44c9-8ca2-1d7096204316",
      name: "Margherita",
      price: 7,
      base: "Tomate",
      ingredients: ["Mozzarella", "Basilic"] as Ingredient[],
    },
    {
      id: "6e7c919d-ee62-4ecc-9d24-0a4663732d1f",
      name: "Siciliana",
      price: 11,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Aubergines",
        "Olives Noires",
      ] as Ingredient[],
    },
    {
      id: "737848d2-12c4-43c9-bd2a-0aa78a30bb6d",
      name: "Calabrese",
      price: 10,
      base: "Tomate",
      ingredients: [
        "Saucisson Piquant",
        "Mozzarella",
        "Poivrons",
      ] as Ingredient[],
    },
  ];
  expect(findPizzaWhereNotSold(pizzas, orders)).toMatchObject(["Calabrese"]);
});

test("getMapOfObjectParam with string", () => {
  const pizzas = [
    {
      id: "d088b172-ec12-44c9-8ca2-1d7096204316",
      name: "Margherita",
      price: 7,
      base: "Tomate",
      ingredients: ["Mozzarella", "Basilic"] as Ingredient[],
    },
    {
      id: "6e7c919d-ee62-4ecc-9d24-0a4663732d1f",
      name: "Siciliana",
      price: 11,
      base: "Tomate",
      ingredients: [
        "Mozzarella",
        "Aubergines",
        "Olives Noires",
      ] as Ingredient[],
    },
    {
      id: "737848d2-12c4-43c9-bd2a-0aa78a30bb6d",
      name: "Calabrese",
      price: 10,
      base: "Tomate",
      ingredients: [
        "Saucisson Piquant",
        "Mozzarella",
        "Poivrons",
      ] as Ingredient[],
    },
  ];
  expect(getMapOfObjectParam(pizzas, "name")).toMatchObject([
    "Margherita",
    "Siciliana",
    "Calabrese",
  ]);
  expect(getMapOfObjectParam(pizzas, "price")).toMatchObject([7, 11, 10]);
  expect(getMapOfObjectParam(pizzas, "ingredients")).toMatchObject([
    "Mozzarella",
    "Basilic",
    "Mozzarella",
    "Aubergines",
    "Olives Noires",
    "Saucisson Piquant",
    "Mozzarella",
    "Poivrons",
  ] as Ingredient[]);
});

test("getKeyOfMaxValue", () => {
  const list = { aaa: 3, bbb: 2, ccc: 1 };
  expect(getKeyOfMaxValue(list)).toBe("aaa");
});
