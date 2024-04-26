import { Router, Request, Response } from "express";
import * as adminController from "../../controller/admin/adminController";
const adminRouter: Router = Router();
import { adminVerifyToken } from "../../middleware/adminVerifyToken";


// REGISTER ADMIN
adminRouter.post("/register-admin",async (request: Request, response: Response) => {
    await adminController.registerAdmin(request, response);});

// LOGIN ADMIN
adminRouter.post("/login-admin",async (request: Request, response: Response) => {
    await adminController.loginAdmin(request, response);});

// GET ALL ADMIN
adminRouter.get("/get-All-Admin",adminVerifyToken,async (request: Request, response: Response) => {
    await adminController.getAllAdmin(request, response);});

// GET ADMIN
adminRouter.get("/get-Admin",adminVerifyToken, async (request: Request, response: Response) => {
    await adminController.getAdmin(request, response);});

// UPDATE ADMIN
adminRouter.put("/update-Admin",adminVerifyToken,async (request: Request, response: Response) => {
    await adminController.updateAdmin(request, response);});

// DELETE ADMIN    
adminRouter.delete("/delete-Admin",adminVerifyToken,async (request: Request, response: Response) => {
    await adminController.deleteAdmin(request, response);});

// UPDATE PASSWORD    
adminRouter.put("/update-Password",adminVerifyToken,async (request: Request, response: Response) => {
    await adminController.updatePassword(request, response);});


export default adminRouter;
