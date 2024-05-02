import { Router, Request} from "express";
import * as orderController from "../../controller/user/orderController";
import { userVerifyToken } from "../../middleware/userVerifyToken";

const orderRouter: Router = Router();

// ADD NEW ORDER
orderRouter.post("/add-order",userVerifyToken,orderController.addNewOrder);

// GET ALL ORDER
orderRouter.get("/get-All-order",userVerifyToken,orderController.getAllOrder);



export default orderRouter;
