import mongoose from "mongoose";
import { IProduct } from "../../models/Iproduct";

const productSchema = new mongoose.Schema<IProduct>({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    productImage: { type: [String], required: true },
    discount: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    size: { type: [String], required: true },
    color: { type: [String], required: true },    
    userObj: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    categoryObj: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories' },
    subcategoryObj: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'subCategories' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{
    versionKey: false
});

const ProductModel = mongoose.model<IProduct>('products', productSchema);

export default ProductModel;
