import { Router, Request, Response } from "express";
import * as cartController from "../../controller/user/cartController";
const cartRouter: Router = Router();
import { userVerifyToken } from "../../middleware/userVerifyToken";
import { request } from "http";


// ADD CART
cartRouter.post("/add-cart",userVerifyToken,async (request: Request, response: Response) => {
    await cartController.addToCart(request, response);});

// GET ALL CART
cartRouter.get("/get-All-Carts",userVerifyToken,async (request:Request, response:Response)=>{
    await cartController.getAllCart(request,response);});    

// GET CART
cartRouter.get("/get-Cart",userVerifyToken,async (request:Request, response:Response)=>{
    await cartController.getCart(request,response);});   

// UPDATE CART
cartRouter.put("/update-Cart",userVerifyToken,async (request:Request, response:Response)=>{
    await cartController.updateCart(request,response);});   

// DELETE CART
cartRouter.delete("/delete-Cart",userVerifyToken,async (request:Request, response:Response)=>{
    await cartController.deleteCart(request,response);});      

export default cartRouter;
