import { Router, Request, Response } from "express";
import * as productController from "../../controller/admin/productController";
import { adminVerifyToken } from "../../middleware/adminVerifyToken";
const productRouter: Router = Router();

// ADD PRODUCT
productRouter.post("/add-New-Product",adminVerifyToken,async (request: Request, response: Response) => {
    await productController.addNewProduct(request, response);});




export default productRouter