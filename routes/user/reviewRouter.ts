import { Router, Request, Response } from "express";
import * as reviewController from "../../controller/user/reviewController"
import { userVerifyToken } from "../../middleware/userVerifyToken";


const reviewRouter: Router = Router();


// ADD REVIEW
reviewRouter.post("/add-review",userVerifyToken,reviewController.addReview);

export default reviewRouter