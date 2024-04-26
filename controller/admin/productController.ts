import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import ProductModel from "../../schemas/admin/productSchema";
import { IProduct } from "../../models/Iproduct";
import { ThrowError } from "../../utils/ErrorUtils";

export const addNewProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findOne({ title: req.body.title, isDelete: false });
        console.log("product is:", product);
        
        if (product) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        
        req.body.price = Number(req.body.price);
        
        if (!(req as any).files || (req as any).files.length === 0) {
            return res.status(400).json({ message: 'No 📁📁📁 files uploaded !!! ' });
        }
        
        const imagePath: string[] = [];
        const files: any[] = (req as any).files;
        files.forEach((file: any) => {
            const path = file.path;
            imagePath.push(path);
        });
        
        product = await ProductModel.create({ ...req.body, productImage: imagePath });
        res.status(201).json({ product, message: 'Product Added' });
    } catch (error) {
        return ThrowError(response);
    }
};
