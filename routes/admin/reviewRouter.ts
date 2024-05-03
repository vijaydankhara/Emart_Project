import { Router, Request, Response } from "express";
import * as reviewController from "../../controller/admin/reviewController"
import { adminVerifyToken } from "../../middleware/adminVerifyToken";


const adminreviewRouter: Router = Router();



// GET ALL REVIEW
adminreviewRouter.get("/get-All-review",adminVerifyToken,reviewController.getAllReview);

// DELETE REVIEW
adminreviewRouter.delete("/delete-review",adminVerifyToken,reviewController.deleteReview);



export default adminreviewRouter