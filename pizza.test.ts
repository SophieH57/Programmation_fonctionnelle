import { expect, test } from "bun:test";
import {
  calculateAverage,
  calculatePizzaPriceAverage,
  findPizzasWithoutMeat,
  isMeat,
  isPizzaWithoutMeat,
} from "./pizza-src/pizza-utils";
import type { UUID } from "crypto";
import type { BasePizza, Ingredient } from "./pizza-src/pizza-types";

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
    id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758" as UUID,
    name: "Ortolana",
    price: 12,
    base: "Tomate" as BasePizza,
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
    id: "e9f2f06b-030a-4526-bc26-652fe1bf446b" as UUID,
    name: "Diavola",
    price: 10,
    base: "Tomate" as BasePizza,
    ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
  };
  expect(isPizzaWithoutMeat(vegPizza)).toBeFalse();
});

test("findPizzasWithoutMeat", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b" as UUID,
      name: "Diavola",
      price: 10,
      base: "Tomate" as BasePizza,
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758" as UUID,
      name: "Ortolana",
      price: 12,
      base: "Tomate" as BasePizza,
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
  expect(findPizzasWithoutMeat(pizzaList)).toMatchObject([
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758" as UUID,
      name: "Ortolana",
      price: 12,
      base: "Tomate" as BasePizza,
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

test("calculatePizzaPriceAverage", () => {
  const pizzaList = [
    {
      id: "e9f2f06b-030a-4526-bc26-652fe1bf446b" as UUID,
      name: "Diavola",
      price: 10,
      base: "Tomate" as BasePizza,
      ingredients: ["Mozzarella", "Saucisson Piquant"] as Ingredient[],
    },
    {
      id: "e1a97d34-c6b2-4a13-ac40-f79d75ee9758" as UUID,
      name: "Ortolana",
      price: 12,
      base: "Tomate" as BasePizza,
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
  expect(calculatePizzaPriceAverage(pizzaList)).toBe(11);
});
