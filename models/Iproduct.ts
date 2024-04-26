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
  userObj: mongoose.Schema.Types.ObjectId;
    categoryObj: mongoose.Schema.Types.ObjectId;
    subcategoryObj: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
