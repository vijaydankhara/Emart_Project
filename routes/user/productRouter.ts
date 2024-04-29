import { Router} from "express";
import * as productController from "../../controller/user/productController";
import { userVerifyToken } from "../../middleware/userVerifyToken";

const userproductRouter: Router = Router();


// GET ALL PRODUCT
userproductRouter.get("/get-All-Product",userVerifyToken,productController.getAllProduct);

// GET  PRODUCT
userproductRouter.get("/get-Product",userVerifyToken,productController.getProduct);


export default userproductRouter;
