import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import ProductModel from "../../schemas/admin/productSchema";
import { IProduct } from "../../models/Iproduct";
import { ThrowError } from "../../utils/ErrorUtils";

export const addNewProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findOne({ title: req.body.title, isDelete: false });
        // console.log("product is:", product);
        
        if (product) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        
        req.body.price = Number(req.body.price);
        // console.log((req as any).files);
        if (!(req as any).files || (req as any).files.length === 0) {
            return res.status(400).json({ message: 'No 📁📁📁 files uploaded !!! ' });
        }
        
        const imagePath: string[] = [];
        const files: any[] = (req as any).files;
        files.forEach((file: any) => {
            const path = file.path;
            imagePath.push(path);
        });
        // console.log(imagePath);
         
        product = await ProductModel.create({...req.body, productImage: imagePath });
        product.save();
        console.log(product);
        res.status(201).json({ product, message: 'Product Added' });

    
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};


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



// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await ProductModel.findByIdAndUpdate(product._id, { ...req.body });
        res.status(202).json({ product, message: 'Product is updated' });
    } catch (error) {
        return ThrowError(response);
      }
};


// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product is not found' });
        }
        product = await ProductModel.findByIdAndUpdate(product._id, { isdelete: true });
        res.status(200).json({ product, message: 'Product is Deleted' });
    } catch (error) {
    return ThrowError(response);
}
};