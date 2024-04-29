import { Router} from "express";
import * as whishlistController from "../../controller/user/wishlistController"
import { userVerifyToken } from "../../middleware/userVerifyToken";

const whishlistRouter: Router = Router();


// GET ALL PRODUCT
whishlistRouter.get("/get-All-Product",userVerifyToken,whishlistController.addToWishlist);

// GET  PRODUCT
// userwhishlistRouter.get("/get-Product",userVerifyToken,whishlistController.getProduct);


export default whishlistRouter;
