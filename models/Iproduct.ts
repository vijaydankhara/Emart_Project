import mongoose from "mongoose";
export interface IProduct {
  title: string;
  description: string;
  productImage: string[];
  discount: string;
  price: number;
  category: string;
  size: String[];
  color: String[];
  isdelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
