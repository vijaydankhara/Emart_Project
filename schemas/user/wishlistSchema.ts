import mongoose, { Schema } from 'mongoose';
import { IWishlist } from "../../models/IWishlist";

const wishlistSchema = new mongoose.Schema<IWishlist>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});

const WishlistModel = mongoose.model<IWishlist>('wishlists', wishlistSchema);

export default WishlistModel;
