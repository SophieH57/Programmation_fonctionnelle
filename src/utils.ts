import type { Fruit, Vendor } from "../types";

// UC01
export const displayStock = (vendor: Vendor): Vendor["stock"] => {
  const vendorStock = { ...vendor.stock };
  return vendorStock;
};

// UC092
export const sellFruits = (
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
): { vendor: Vendor; message: string } => {
  if (Object.keys(vendor.stock).includes(fruitName)) {
    const newQuantity = vendor.stock[fruitName] - quantity;
    const vendorStock = { ...vendor.stock, [fruitName]: newQuantity };
    const updatedVendor = { name: vendor.name, stock: vendorStock };
    return {
      vendor: updatedVendor,
      message: `${quantity} ${fruitName} ont été vendus.`,
    };
  } else return { vendor, message: `${fruitName} non disponibles` };
};

// UC04
export const addFruits = (
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
): { vendor: Vendor; message: string } => {
  const newQuantity = vendor.stock[fruitName] + quantity;
  const { [fruitName]: _, ...updatedStock } = vendor.stock;
  const updatedVendor = {
    ...vendor,
    stock: {
      ...updatedStock,
      [fruitName]: vendor.stock[fruitName] ? newQuantity : quantity,
    },
  };
  return {
    vendor: updatedVendor,
    message: `${quantity} ${fruitName} ajouté(es) au stock`,
  };
};

// UC05
export const removeFruits = (
  vendor: Vendor,
  fruitName: Fruit["name"]
): { vendor: Vendor; message: string } => {
  if (Object.keys(vendor.stock).includes(fruitName)) {
    const { [fruitName]: quantity, ...updatedStock } = vendor.stock;
    const updatedVendor = {
      ...vendor,
      stock: updatedStock,
    };

    return {
      vendor: updatedVendor,
      message: `${fruitName} supprimé du stock.`,
    };
  } else {
    return {
      vendor,
      message: `${fruitName} n'existe pas dans le stock.`,
    };
  }
};

// UC06
export const checkFruitAvailabilityAndStock = (
  vendor: Vendor,
  fruitName: Fruit["name"],
  quantity: number
): { check: boolean; message: string } => {
  const checkAvailability =
    Object.keys(vendor.stock).includes(fruitName) &&
    vendor.stock[fruitName] >= quantity;
  return {
    check: checkAvailability,
    message: checkAvailability
      ? `${fruitName} présent en quantité suffisante dans le stock.`
      : Object.keys(vendor.stock).includes(fruitName)
      ? `${fruitName} disponible en quantité insuffisante.`
      : `${fruitName} absent du stock.`,
  };
};
