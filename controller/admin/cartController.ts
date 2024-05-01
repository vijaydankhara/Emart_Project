// import { Request, Response } from 'express';
// import CartModel from '../../schemas/admin/cartSchema';
// import { ThrowError } from '../../utils/ErrorUtils';

// // Define a custom interface to extend the Request type
// interface CustomRequest extends Request {
//     admin?: { _id: string }; // Define the admin property with _id of type string
// }

// export const getAllCart = async (req: CustomRequest, res: Response) => {
//     try {
        
//         if (!req.admin || !req.admin._id) {
//             return res.status(400).json({ error: "Invalid request" });
//         }

//         const userCarts = req.query.me && req.query.me === 'true' ? [
//             { $match: { user: req.admin._id } }
//         ] : [];

//         const pipeline = [
//             { $match: { admin: req.admin._id, isDelete: false } },
//             ...userCarts,
//             {
//                 $lookup: {
//                     from: "products",
//                     localField: 'cartItem',
//                     foreignField: '_id',
//                     as: 'cartItem'
//                 }
//             },
//             { $set: { "cartItem": { $first: "$cartItem" } } }
//         ];

//         const carts = await CartModel.aggregate(pipeline);
//         res.status(200).json(carts);
//         console.log(carts);
//     } catch (error) {
//         return ThrowError(res);
//     }
// };
// export function addToCart(request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) {
//     throw new Error("Function not implemented.");
// }

