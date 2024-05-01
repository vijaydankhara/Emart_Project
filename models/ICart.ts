import { Schema } from "mongoose";

export interface ICart {
  user: Schema.Types.ObjectId;
  cartItem: Schema.Types.ObjectId;
  quantity?: number;
  isDelete?: boolean;
}
