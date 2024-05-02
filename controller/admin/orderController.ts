import { Request, Response } from 'express';
import orderModel from '../../schemas/user/orderSchema';
import { ThrowError } from '../../utils/ErrorUtils';




// GET ALL ORDER
export const getAllOrder = async (req: Request, res: Response) => {
    try {
        let orders = await orderModel.find({ isDelete: false });
        console.log(orders);
        if (!orders) {
            res.status(404).json({ message: `Orders Not Found.....`});
        }
        res.status(200).json(orders);
    } catch (error) {
        return ThrowError(res);
    }
};

