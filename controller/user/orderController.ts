import { Request, Response } from 'express';
import orderModel from '../../schemas/user/orderSchema';
import { ThrowError } from '../../utils/ErrorUtils';
import CartModel from '../../schemas/admin/cartSchema';


// ADD NEW ORDER
export const addNewOrder = async (req: Request, res: Response) => {
    try {
        const userCarts = req.query.me && req.query.me === 'true' ? [
            { $match: { user: req.user._id } }
        ] : [];
        
        const find = [
            { $match: { isDelete: false } },
            ...userCarts,
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

        const cartItems = await CartModel.aggregate(find); // Changed Cart to CartModel

        if (cartItems.length === 0) {
            return res.status(404).json({ message: `Cart Not Found....` });
        }

        const orderItems = cartItems.map((item: any) => ({
            product: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }));

        const totalPrice = orderItems.reduce((total: number, item: any) => (total + (item.price * item.quantity)), 0);
        
        const newOrder = await orderModel.create({ // Assuming orderModel is imported or defined elsewhere
            user: req.user,
            items: orderItems,
            totalAmount: totalPrice
        });

        await CartModel.updateMany({ user: req.user._id }, { isDelete: true });
        
        return res.status(201).json({ newOrder, message: `Order Place Successfully` });
    } catch (error) {
        return ThrowError(res);
    }
};


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


export const getOrder = async (req: Request, res: Response) => {
    try {
        let order = await orderModel.findById({_id: req.query.orderId, isDelete: false});
        // console.log(order);
        if (!order) {
            res.status(404).json({ message: `Orders Not Found.....`});
        }
        res.status(200).json(order);
    } catch (error) {
        return ThrowError(res);
    }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        let order = await orderModel.findOne({ _id: req.query.orderId, isDelete: false });
        if (!order) {
            return res.status(404).json({ message: `Order Not Found...` });
        }
        
        order = await orderModel.findByIdAndUpdate(order._id, { isDelete: true });
        if (!order) {
            return res.status(404).json({ message: `Order Not Found...` });
        }
        
        res.status(200).json({ order, message: `Order Deleted Successfully...` });
    } catch (error) {
        return ThrowError(res);
    }
};
