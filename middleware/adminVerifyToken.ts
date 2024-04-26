import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../schemas/admin/adminSchema";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
    interface Response {
      user?: any;
    }
  }
}

// ADMIN VERIFY TOKEN
export const adminVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers["authorization"];
    if (authorization === undefined) {
      return res.json({ message: `Invalid Authorization ${console.error()}` });
    }
    const token = authorization.split(" ")[1];
    // console.log("token is : ", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: `Unauthorized ${console.error()}` });
    } else {
      const payLoad: any = jwt.verify(token,process.env.SECRETE_KEY as string);

      const adminId = payLoad.adminId;
      const admin = await AdminModel.findById(adminId);
      // console.log(admin);
      if (admin) {
        req.user = admin;
        next();
      } else {
        return res
          .status(401)
          .json({ message: `Invalid Admin (token) ${console.error()}` });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: `Internal Server Error From Admin Token` });
  }
};
