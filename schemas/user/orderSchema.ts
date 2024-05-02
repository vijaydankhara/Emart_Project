import mongoose,{Schema} from 'mongoose';
import { IOrder } from "../../models/IOrder";


const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true
});

const orderModel = mongoose.model<IOrder>('orders', orderSchema);
export default orderModel;


