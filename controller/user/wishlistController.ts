import { Request, Response, response } from "express";
import { ThrowError } from "../../utils/ErrorUtils";
import WishlistModel from "../../schemas/user/wishlistSchema";

// ADD NEW WISHLIST
export const addToWishlist = async (req: Request,res: Response) => {
    try {
      let wishlist = await WishlistModel.findOne({
        cartItem: req.body.cartItem,
        user: (req.user)._id,
        isDelete: false,
      });
      if (wishlist) {
        return res.status(400).json({ Message: "Wishlist is alredy exist" });
      }
      wishlist = await WishlistModel.create({ ...req.body, user: (req.user)._id });
      res.status(201).json({ wishlist, Message: "Wishlist is Added..." });
} catch (error) {
    return ThrowError(res);
  }
  };

  // GET ALL WISHLIST
export const getAllWishlist = async (req: Request,res: Response) => {
  try {
    let wishlist = await WishlistModel.find(req.query);
    res.status(200).json(wishlist);
  } catch (error) {
    return ThrowError(res);
  }
}


// DELETE WISHLIST
export const deleteWishlist = async (req: Request,res: Response) => {
  try {
    let wishlist = await WishlistModel.findById(req.query.Id);
    if (!wishlist) {
      return res.status(404).json({ Message: "Wishlist is not found" });
    }
    wishlist = await WishlistModel.findByIdAndUpdate(wishlist._id, {
      isDelete: true,
    });
    res.status(202).json({ wishlist, Message: "Wishlist is Deleted..." });
  } catch (error) {
    return ThrowError(res);
  }
};