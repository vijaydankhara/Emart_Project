import { Request,Response, response } from "express";
import bcrypt from "bcrypt" 
import Jwt  from "jsonwebtoken";
import UserModel from "../../schemas/user/userSchema";
import { IUser } from "../../models/IUser";

import {ThrowError} from "../../utils/ErrorUtils"
import { isJWT } from "validator";




/**
 * @usage : Register a User,
 * @url :  http://localhost:1999/api/admin/register-admin
 * @param : firstName,lastName,gender,email,password,mobileNo
 * @method : POST
 * @access : PUBLIC 
 */
export const registerUser = async (request:Request,response:Response) =>{
    try {
        let {firstName,lastName,gender,email,password,mobileNo} = request.body;

        let userobj = await UserModel.findOne({email:email});

        if(userobj){
            return response.status(401).json({message: 'User Is Alredy Exist....'});
        }
        // hash password
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(password,salt);

        // create user
        let newUser : IUser ={
            firstName: firstName,
            email:email,
            lastName:lastName,
            gender:gender,
            mobileNo:mobileNo,
            password:hashPassword
        };

        let user = await new UserModel(newUser).save();
        if(user){
            return response.status(201).json({message: 'Register Sucessfully...'});
        }
    } catch (error) {
        return ThrowError(response);
    }
};

/**
 * @usage : Login  User,
 * @url : http://localhost:1999/api/admin/login-admin
 * @param : email, password
 * @method : POST
 * @access : PUBLIC
 */



export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      let user = await UserModel.findOne({ email: email, isdelete: false });
      // console.log("user is ", user);
  
      if (!user) {
        return res.status(404).json({ message: "Invalid Email or Password" });
      }
  
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ message: "Invalid Password" });
      }
  
      let payload = {
        userId: user._id
      };
      
      let SECRETE_KEY: string | undefined = process.env.SECRETE_KEY;
      if (payload && SECRETE_KEY) {
        let token = Jwt.sign(payload, SECRETE_KEY);
        // console.log("token", token);
  
        return res.status(200).json({ token, message: "Login successful" });
      }
    } catch (error) {
      return ThrowError(response);
    }
  }
  
  /**
   * @usage : GET ALL user
   * @url : http://localhost:1999/api/admin/get-All-Admin
   * @param : adminVerifyToken
   * @method : POST
   * @access : PUBLIC
   */
  
  export const getAllUser = async (req:Request, res:Response)=>{
    try {
      let user = await UserModel.find({
        isAdmin: false,
        isdelete: false,
      });
      // console.log("User is : ", user);
      if (!user) {
        return res.status(404).json({message: "user Data Not Found!!!"});
      }
      res.status(200).json(user);
    } catch (error) {
      return ThrowError(response);
    }
  }
  
  
  /**
   * @usage : GET SPESIFIC USER
   * @url : http://localhost:1999/api/admin/get-Admin
   * @param : adminId, adminVerifyToken
   * @method : GET
   * @access : PUBLIC
   */
  
  export const getUser = async (req: Request, res: Response) => {
    try{
      const userId = req.query.userId; 
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      let user = await UserModel.findById(userId);
      // console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User Not Foud...."});
      }
      res.status(200).json(user);
    } catch (error) {
      return ThrowError(response);
    }
  }
  
  /**
   * @usage : GET SPESIFIC USER
   * @url : http://localhost:1999/api/admin/
   * @param : adminId , adminVerifyToken
   * @method : PUT
   * @access : PUBLIC
   */
  
  
  export const updateUser = async (req: Request, res: Response) => {
    try {
      let user = await UserModel.findById(req.query.userId);
      console.log("user is :", user);
      
      if (!user) {
        return res.status(404).json({ message: `User Not Found...` });
      }
      user = await UserModel.findByIdAndUpdate(user._id, { ...req.body });
      res.status(201).json({ user: user, message: `User Updated Successfully...` });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Internal Server Error..${console.error()}` });
    }
  };
  
  
  /**
   * @usage : DELETE USER
   * @url : http://localhost:1999/api/admin/delete-Admin
   * @param : adminId , adminVerifyToken
   * @method : DELETE
   * @access : PUBLIC
   */
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      let user = await UserModel.findById(req.query.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found..." });
      }
      user = await UserModel.findByIdAndUpdate(user._id, { isdelete: true });
      res.status(200).json({ user: user, message: `User Deleted Succesfully...` });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Internal Server Error..${console.error()}` });
    }
  };
  
  /**
   * @usage : UPDATE PASSWORD
   * @url : http://localhost:1999/api/admin/update-Password
   * @param : adminId ,Old Password,New Password adminVerifyToken,
   * @method : PUT
   * @access : PUBLIC
   */
  
  
  export const updatePassword = async (req: Request, res: Response) => {
    try {
        let user = await UserModel.findById(req.query.userId);
        if (!user) {
            return res.json({ message: `User Not Found....Please try again..` });
        }
        let comparePassword = await bcrypt.compare(req.body.oldPassword, req.user.password);
        let oldPassword = req.body.oldPassword;
        if (!oldPassword) {
            return res.json({ message: `Old Password 🔑 is not Found.. Please Try Again.` });
        }
        if (!comparePassword) {
            return res.json({ message: `Old Password 🔑 is not match.. Please Try Again.` });
        }
        let newPassword: any = req.body.newPassword;
        if (!newPassword) {
            return res.json({ message: `New Password 🔑 is Not Found.` });
        }
        if (newPassword === oldPassword) {
            return res.json({ message: `Old Password 🔑 and New Password Are Same Please Enter Diffrent Password.` });
        }
        let confirmPassword = req.body.confirmPassword;
        if (!confirmPassword) {
            return res.json({ message: `Confirm Password 🔑 is Not Found.` });
        }
        if (newPassword !== confirmPassword) {
            return res.json({ message: `New Password 🔑 and Confirm  Password are not same.` });
        }
        let hashPassword = await bcrypt.hash(newPassword, 10);
        user = await UserModel.findByIdAndUpdate(req.user._id, { password: hashPassword });
        res.status(200).json({ message: 'Password 🔑 changed successfully🔑🔑🔑🔑' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}` });
    }
  }

export function addReview(arg0: string, userVerifyToken: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>, addReview: any) {
    throw new Error("Function not implemented.");
}
