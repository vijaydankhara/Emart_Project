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

// ADMIN VERIFY TOKEN
export const adminVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.status(401).json({ message: 'Invalid Authorization' });
        }
        const token = authorization.split(" ")[1];
       
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            const payLoad: any = jwt.verify(token, 'Admin');

            const adminId = payLoad.adminId;
            const admin = await AdminModel.findById(adminId);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: 'Invalid Admin (token)' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error From Admin Token' });
    }
}