import { Request, Response } from "express";
import reviewModel from "../../schemas/user/reviewSchema";
import { ThrowError } from "../../utils/ErrorUtils";
import mongoose from "mongoose"; 


// ADD REVIEW
export const addReview = async (req: Request, res: Response) => {
    try {
        // Validate if productId is provided in the query
        const productId = req.query.productId;
        if (!productId) {
            return res.status(400).json({ Message: 'Product ID is required' });
        }

        // Convert productId to ObjectId
        const objectIdProductId = new mongoose.Types.ObjectId(productId as string);

        // Check if the review already exists for the user and product
        const existingReview = await reviewModel.findOne({
            user: (req.user as any)._id,
            product: objectIdProductId,
            isDelete: false
        });
        if (existingReview) {
            return res.status(400).json({ Message: 'Review already exists' });
        }

        // Create a new review
        const review = await reviewModel.create({ ...req.body, user: (req.user as any)._id });
        res.status(201).json({ review, Message: 'Review added successfully' });
    } catch (error) {
        return ThrowError(res);
    }
};
