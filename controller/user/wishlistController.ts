import { Request, Response, response } from "express";
import { ThrowError } from "../../utils/ErrorUtils";
import WishlistModel from "../../schemas/user/wishlistSchema";

// ADD NEW WISHLIST
export const addToWishlist = async (req: Request,res: Response) => {
    try {
      let wishlist = await WishlistModel.findOne({
        product: req.body.product,
        user: (req.user as any )._id,
        isDelete: false,
      });
      if (wishlist) {
        return res.status(400).json({ Message: "Wishlist is alredy exist" });
      }
      wishlist = await WishlistModel.create({ ...req.body, user: (req.user as any )._id });
      res.status(201).json({ wishlist, Message: "Wishlist is Added..." });
} catch (error) {
    return ThrowError(response);
  }
  };