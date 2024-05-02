import { Router, Request} from "express";
import * as orderController from "../../controller/admin/orderController";
import { adminVerifyToken } from "../../middleware/adminVerifyToken";

const adminorderRouter: Router = Router();

// GET ALL ORDER
adminorderRouter.get("/get-All-order",adminVerifyToken,orderController.getAllOrder);



export default adminorderRouter;
