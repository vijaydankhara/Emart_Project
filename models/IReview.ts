import mongoose from "mongoose";

export interface IReview{
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    isDelete: boolean;
    createdAt: Date;
    updatedAt: Date;
}