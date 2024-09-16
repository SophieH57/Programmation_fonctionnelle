import type { Fruit, Vendor } from "../types";

// UC01
export function displayStock(vendor: Vendor) {
  return vendor.stock;
}

// UC092
export function sellFruits(
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
) {
  vendor.stock[fruitName] -= quantity;
  console.log(`${quantity} ${fruitName} vendus.`);
  return vendor;
}

// UC04
export function addFruits(
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
) {
  if (Object.keys(vendor.stock).includes(fruitName)) {
    vendor.stock[fruitName] += quantity;
  } else {
    vendor.stock[fruitName] = quantity;
  }
  console.log(`${quantity} ${fruitName} ajouté(es) au stock`);
  return vendor;
}

// UC05
export function removeFruits(vendor: Vendor, fruitName: Fruit["name"]) {
  delete vendor.stock[fruitName];
  console.log(`${fruitName} supprimé du stock.`);
  return vendor;
}

// UC06
export function checkFruitAvalabilityAndStock(
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
) {
  if (
    Object.keys(vendor.stock).includes(fruitName) &&
    vendor.stock[fruitName] >= quantity
  ) {
    console.log(`${fruitName} présent en quantité suffisante dans le stock.`);
    return true;
  } else {
    if (!Object.keys(vendor.stock).includes(fruitName))
      console.log(`${fruitName} absent du stock.`);
    else console.log(`${fruitName} disponible en quantité insuffisante.`);
    return false;
  }
}
