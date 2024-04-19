import { Request,Response } from "express";
import bcrypt from "bcrypt" 
// import Jwt  from "jsonwebtoken";
import UserModel from "../../schemas/userSchema";
import { IUser } from "../../models/IUser";

import {ThrowError} from "../../utils/ErrorUtils"




/**
 * @usage : Register a User,
 * @url : 
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