import { Router} from "express";
import * as contactController from "../../controller/user/contactController"
import { userVerifyToken } from "../../middleware/userVerifyToken";

const contactRouter: Router = Router();


// SEND REQUEST USER
contactRouter.post("/send-Request-User",userVerifyToken,contactController.sendRequestUser);



export default contactRouter;
