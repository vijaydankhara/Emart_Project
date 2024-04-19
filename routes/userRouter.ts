import { Router } from "express";
import { request } from "http";
import * as userController from "../controller/user/userController"
const userRouter: Router = Router();

/**
 * @usage : Register a User
 * @url : 
 * @params : firstName,lastName,gender , email , password
 * @method : POST
 * @access : PUBLIC
 */

userRouter.post('/register-user',async (request:Request,response:Response)=>{
await userController.registerUser(request,response);
})