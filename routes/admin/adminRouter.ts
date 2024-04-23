import { Router, Request, Response } from "express";
import * as adminController from "../../controller/admin/adminController"

const adminRouter: Router = Router();

/**
 * @usage  : Register Admin
 * @url    : http://localhost:1999/api/admin/register-admin
 * @params : firstName,lastName,gender , email , password
 * @method : POST
 * @access : PUBLIC
 */

adminRouter.post('/register-admin',async (request:Request,response:Response)=>{
await adminController.registerAdmin(request,response);
})

/**
 * @usage  : Login Admin
 * @url    : http://localhost:1999/api/admin/login-admin
 * @params : email , password
 * @method : POST
 * @access : PUBLIC
 */

adminRouter.post('/login-admin',async (request:Request,response:Response)=>{
    await adminController.loginAdmin(request,response);
    })



export default adminRouter;