export interface IOrder {
  user?: string;
  items?: {
    product?: string;
    quantity?: number;
  }[];
  totalAmount?: number;
  isDelete?: boolean;
}
