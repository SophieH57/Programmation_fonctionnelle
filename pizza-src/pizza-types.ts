// export type BasePizza = "Tomate" | "Crème" | "Nature";

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
  id: string;
  name: string;
  price: number;
  base: string;
  ingredients: Ingredient[];
};

// export type OrderType = "Delivery" | "Take Away" | "For Here";

// export type StatusType = "Completed";

export type itemType = {
  pizzaId: string;
  quantity: number;
  price: number;
  amount: number;
};

export type Order = {
  id: string;
  orderedAt: Date;
  readyAt: Date;
  orderType: string;
  status: string;
  amount: number;
  totalAmount: number;
  items: itemType[];
  deliveryCosts: number;
};
