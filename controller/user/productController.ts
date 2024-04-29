import { Request, Response, response } from "express";
import ProductModel from "../../schemas/admin/productSchema";
import { ThrowError } from "../../utils/ErrorUtils";



// GET ALL PRODUCT
export const getAllProduct = async (req: Request, res: Response) => {
    try {
        let products = await ProductModel.find(req.query);
        res.status(200).json(products);
} catch (error) {
    return ThrowError(response);
  }
};



// GET PRODUCT
export const getProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findById(req.query.productId);
        if (product === undefined || product === null)      
        {
            return res.status(404).json({ message: 'Product is not found' });
        }
        res.status(200).json (product);
    } catch (error) {
        return ThrowError(response);
      }
};


