import {Types } from 'mongoose';

export interface IWishlist {
    user: Types.ObjectId; // Assuming user is of type ObjectId
    product: Types.ObjectId; // Assuming product is of type ObjectId
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

