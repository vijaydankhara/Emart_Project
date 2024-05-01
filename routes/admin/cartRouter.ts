import { Router, Request, Response } from "express";
import * as cartController from "../../controller/admin/cartController";
import { adminVerifyToken } from "../../middleware/adminVerifyToken";

const admincartRouter: Router = Router();

// REGISTER ADMIN
admincartRouter.get("/get-All-cart",adminVerifyToken,async (request: Request, response: Response) => {
    await cartController.getAllCart(request, response);});


export default admincartRouter;
