import { expect, test } from "bun:test";
import {
  addFruits,
  checkFruitAvailabilityAndStock,
  displayStock,
  removeFruits,
  sellFruits,
} from "./market-src/market-utils";

const vendeur1 = {
  name: "vendeur1",
  stock: { pomme: 10, poire: 5, ananas: 8 },
};

// // UC01
test("displayStock", () => {
  expect(displayStock(vendeur1)).toMatchObject({
    pomme: 10,
    poire: 5,
    ananas: 8,
  });
});

// UC04
test("addFruits", () => {
  const vendeur1With5pomme = addFruits(vendeur1, "pomme", 5);
  expect(vendeur1With5pomme.vendor.stock["pomme"]).toBe(15);
});

// UC03
test("addFruits", () => {
  const vendeur1With5pomme = addFruits(vendeur1, "citron", 8);
  expect(vendeur1With5pomme.vendor.stock["citron"]).toBe(8);
});

// UC02
test("sellFruits", () => {
  const vendeur1Sell2Ananas = sellFruits(vendeur1, "ananas", 2);
  expect(vendeur1Sell2Ananas.vendor.stock["ananas"]).toBe(6);
});

// UC05
test("removeFruits", () => {
  const vendeur1withoutAnanas = removeFruits(vendeur1, "ananas");
  expect(vendeur1withoutAnanas.vendor.stock).toMatchObject({
    pomme: 10,
    poire: 5,
  });
});

// UC06
test("checkFruitAvalabilityAndStock with fruit absent in stock", () => {
  const vendeur2 = {
    name: "vendeur2",
    stock: {
      pomme: 2,
      poire: 4,
    },
  };
  expect(checkFruitAvailabilityAndStock(vendeur2, "ananas", 4).check).toBe(
    false
  );
});

// UC06
test("checkFruitAvalabilityAndStock with quantity insufficient", () => {
  const vendeur2 = {
    name: "vendeur2",
    stock: {
      pomme: 2,
      poire: 4,
    },
  };
  expect(checkFruitAvailabilityAndStock(vendeur2, "poire", 8).check).toBe(
    false
  );
});

// UC06
test("checkFruitAvalabilityAndStock with sufficiant quantity", () => {
  const vendeur2 = {
    name: "vendeur2",
    stock: {
      pomme: 2,
      poire: 4,
    },
  };
  expect(checkFruitAvailabilityAndStock(vendeur2, "poire", 3).check).toBe(true);
});
