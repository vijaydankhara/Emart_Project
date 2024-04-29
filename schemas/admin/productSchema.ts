import mongoose from "mongoose";
import { IProduct } from "../../models/Iproduct";

const productSchema = new mongoose.Schema<IProduct>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    productImage: [{ type: String, required: true }],
    discount: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    size: [{ type: String }],
    color: [{ type: String }],    
    isdelete: {type: Boolean,  default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

const ProductModel = mongoose.model<IProduct>('products', productSchema);

export default ProductModel;
