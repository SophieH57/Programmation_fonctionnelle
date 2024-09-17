export type Fruit = {
  name: string;
};

export type Vendor = {
  name: string;
  stock: Record<Fruit["name"], number>;
};
