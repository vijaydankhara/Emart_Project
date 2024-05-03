import { Router, Request, Response } from "express";
import * as reviewController from "../../controller/user/reviewController"
import { userVerifyToken } from "../../middleware/userVerifyToken";


const reviewRouter: Router = Router();


// ADD REVIEW
reviewRouter.post("/add-review",userVerifyToken,reviewController.addReview);

// GET ALL REVIEW

// GET REVIEW
reviewRouter.get("/get-review",userVerifyToken,reviewController.getReview);

// UPDATE REVIEW
reviewRouter.put("/update-review",userVerifyToken,reviewController.updateReview);

// DELETE REVIEW
reviewRouter.delete("/delete-review",userVerifyToken,reviewController.deleteReview);



export default reviewRouter