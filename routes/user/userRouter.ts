import { Router, Request, Response } from "express";
import * as userController from "../../controller/user/userController"

const userRouter: Router = Router();

/**
 * @usage : Register a User
 * @url :  http://localhost:1999/api/users/register-user
 * @params : firstName,lastName,gender , email , password
 * @method : POST
 * @access : PUBLIC
 */

userRouter.post('/register-user',async (request:Request,response:Response)=>{
await userController.registerUser(request,response);
})




export default userRouter;