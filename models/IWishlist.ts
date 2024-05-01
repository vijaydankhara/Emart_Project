import {Types } from 'mongoose';

export interface IWishlist {
    user: Types.ObjectId; 
    cartItem: Types.ObjectId;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

