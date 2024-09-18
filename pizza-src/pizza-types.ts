import type { UUID } from "crypto";

export type BasePizza = "Tomate" | "Crème" | "Nature";

export type Ingredient =
  | "Mozzarella"
  | "Ananas"
  | "Jambon Cuît"
  | "Parmesan"
  | "Champignons"
  | "Jambon Cru"
  | "Olives Noires"
  | "Ail"
  | "Origan"
  | "Saucisson Piquant"
  | "Olives Vertes"
  | "Coeurs d'Artichaut"
  | "Poivrons"
  | "Courgettes"
  | "Basilic"
  | "Aubergines"
  | "Gorgonzola"
  | "Provola"
  | "Anchois"
  | "Roquette";

export type Pizza = {
  id: UUID;
  name: string;
  price: number;
  base: BasePizza;
  ingredients: Ingredient[];
};

export type OrderType = "Delivery" | "Take Away" | "For Here";

export type StatusType = "Completed";

export type itemType = {
  pizzaId: UUID;
  quantity: number;
  price: number;
  amount: number;
};

export type Order = {
  id: UUID;
  orderedAt: Date;
  readyAt: Date;
  orderType: OrderType;
  status: StatusType;
  amount: number;
  totalAmount: number;
  items: itemType[];
  deliveryCosts: number;
};
