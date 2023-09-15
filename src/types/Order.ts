export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type Orderslist = {
  id: number;
  userId: number;
  productIds?: number[];
};