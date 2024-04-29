import { Router, Request, Response } from "express";
import * as productController from "../../controller/admin/productController";
import { adminVerifyToken } from "../../middleware/adminVerifyToken";
import upload from "../../middleware/imageUpload";
const productRouter: Router = Router();

// ADD PRODUCT
productRouter.post("/add-New-Product",adminVerifyToken,upload.array("productImage"),
productController.addNewProduct);

// GET ALL PRODUCT
productRouter.get("/get-All-Product",adminVerifyToken,productController.getAllProduct);

// GET  PRODUCT
productRouter.get("/get-Product",adminVerifyToken,productController.getProduct);

// UPDATE  PRODUCT
productRouter.put("/update-Product",adminVerifyToken,productController.updateProduct);

// DELETE  PRODUCT
productRouter.delete("/delete-Product",adminVerifyToken,productController.deleteProduct);

export default productRouter;
