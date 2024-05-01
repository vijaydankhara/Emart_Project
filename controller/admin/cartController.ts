import { Request, Response } from 'express';
import CartModel from '../../schemas/admin/cartSchema';
import { ThrowError } from '../../utils/ErrorUtils';

// GET ALL CART
export const getAllCart = async (req: Request, res: Response) => {
    try {
        let adminCarts = req.query.me === 'true' ? [
            {
                $match: { admin: req.user._id }
            }
        ] : [];

        let aggregateQuery = [
            { $match: { isDelete: false } },
            ...adminCarts,
            {
                $lookup: {
                    from: "products",
                    localField: 'cartItem',
                    foreignField: '_id',
                    as: 'cartItem'
                }
            },
            { $set: { "cartItem": { $first: "$cartItem" } } }
        ];

        let carts = await CartModel.aggregate(aggregateQuery);

        res.status(200).json(carts);
    } catch (error) {
        return ThrowError(res);
      }
};

