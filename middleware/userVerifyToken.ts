import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../schemas/user/userSchema";

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
export const userVerifyToken = async (
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

      const userId = payLoad.userId;
      const user = await UserModel.findById(userId);
      // console.log(user);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({ message: `Invalid User (token) ${console.error()}` });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: `Internal Server Error From User Token` });
  }
};
