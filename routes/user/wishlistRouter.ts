import { Router} from "express";
import * as whishlistController from "../../controller/user/wishlistController"
import { userVerifyToken } from "../../middleware/userVerifyToken";

const whishlistRouter: Router = Router();


// ADD WISHLIST
whishlistRouter.post("/add-whishlist",userVerifyToken,whishlistController.addToWishlist);

// GET ALL WISHISH
whishlistRouter.get("/get-All-wishlist",userVerifyToken,whishlistController.getAllWishlist);

// DELETE WISHISH
whishlistRouter.delete("/delete-wishlist",userVerifyToken,whishlistController.deleteWishlist);



export default whishlistRouter;
