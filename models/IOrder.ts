import { Schema } from "mongoose";
import {Types } from 'mongoose';

export interface IOrder {
  user?: string;
  items?: {
    product?: string;
    quantity?: number;
  }[];
  totalAmount?: number;
  isDelete?: boolean;
}
