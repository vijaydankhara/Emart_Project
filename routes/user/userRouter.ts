import { Router, Request, Response } from "express";
import * as userController from "../../controller/user/userController"
import { userVerifyToken } from "../../middleware/userVerifyToken";


const userRouter: Router = Router();


// REGISTER USER
userRouter.post('/register-user',async (request:Request,response:Response)=>{
await userController.registerUser(request,response);});

// LOGIN ADMIN
userRouter.post("/login-user",async (request: Request, response: Response) => {
    await userController.loginUser(request, response);});

// GET ALL ADMIN
userRouter.get("/get-All-user",userVerifyToken,async (request: Request, response: Response) => {
    await userController.getAllUser(request, response);});

// GET ADMIN
userRouter.get("/get-user",userVerifyToken, async (request: Request, response: Response) => {
    await userController.getUser(request, response);});

// UPDATE ADMIN
userRouter.put("/update-user",userVerifyToken,async (request: Request, response: Response) => {
    await userController.updateUser(request, response);});

// DELETE ADMIN    
userRouter.delete("/delete-user",userVerifyToken,async (request: Request, response: Response) => {
    await userController.deleteUser(request, response);});

// UPDATE PASSWORD    
userRouter.put("/update-Password",userVerifyToken,async (request: Request, response: Response) => {
    await userController.updatePassword(request, response);});





export default userRouter;