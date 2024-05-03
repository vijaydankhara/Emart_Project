import mongoose,{Schema} from 'mongoose';
import { IReview } from '../../models/IReview';


const reviewSchema = new mongoose.Schema<IReview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    comment: {
        type: String
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

const reviewModel = mongoose.model<IReview>('reviews', reviewSchema);
export default reviewModel;


