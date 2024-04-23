import jwt from 'jsonwebtoken';
import AdminModel from "../schemas/admin/adminSchema";
import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const tokenAdmin = async (req: Request,res: Response,next: NextFunction) => {
    try {
        let secretKey: any = process.env.SECRETE_KEY 
            let token: any = req.headers['authorization']?.split(" ")[1];
                let {adminId} : any = jwt.verify(token, secretKey);
                let admin = await AdminModel.findOne({_id: adminId, isAdmin: true});
                req.admin = admin;
                if(req.admin){
                    next();
                }
                else{
                    res.json({message: "Invalide admin"})
                }
    } catch (error) {
        return res.status(500).json({message: "internal Server Error"})
    }
}