import { Request, Response } from "express";
import reviewModel from "../../schemas/user/reviewSchema";
import { ThrowError } from "../../utils/ErrorUtils";
import mongoose from "mongoose"; 


// ADD REVIEW
export const addReview = async (req: Request, res: Response) => {
    try {

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

// GET ALL REVIEW

export const getAllReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewModel.find(req.query as any);
        let product = req.query.productId && req.query.productId !== "" ? [
            {
                $match: { product: new mongoose.Types.ObjectId(req.query.productId as string) }
            }
        ] : [];
        let find = [
            { $match: { isDelete: false } },
            ...product
        ];
        
        let result = await reviewModel.aggregate(find);
        res.status(200).json(result);
        return result;
    } catch (error) {
        return ThrowError(res);
    }
}




// Get Review by ID
export const getReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewModel.findById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `Review ID not found!` });
        }
        res.status(200).json(review);
    } catch (error) {
        return ThrowError(res);
    }
};

// Update Review
export const updateReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewModel.findById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: ` This Review does not exist!` });
        }
        review = await reviewModel.findByIdAndUpdate(review._id, { ...req.body});
        res.status(200).json({review, message: ` Product Review Update Successfully....`});
    } catch (error) {
        return ThrowError(res);
    }
};

// DELETE REVIEW
export const deleteReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewModel.findById(req.query.Id);
        if(!review){
            return res.status(404).json({Message: `Review is not found`});
        }
        review = await reviewModel.findByIdAndUpdate(review._id , {isDelete: true});
        res.status(202).json({review , Message: `Review is Delete....`});
    } catch (error) {
        return ThrowError(res);
    }
}