import { Request,Response } from "express";
import bcrypt from "bcrypt" 
import Jwt  from "jsonwebtoken";
import UserModel from "../../schemas/admin/adminSchema";
import { IUser } from "../../models/IUser";

import {ThrowError} from "../../utils/ErrorUtils"




/**
 * @usage : Register a admin,
 * @url :  http://localhost:1999/api/users/register-user
 * @param : firstName,lastName,gender,email,password,mobileNo
 * @method : POST
 * @access : PUBLIC 
 */
export const registerAdmin = async (request:Request,response:Response) =>{
    try {
        let {firstName,lastName,gender,email,password,mobileNo} = request.body;

        let adminobj = await UserModel.findOne({email:email});

        if(adminobj){
            return response.status(401).json({message: 'Admin Is Alredy Exist....'});
        }
        // hash password
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(password,salt);

        // create user
        let newAdmin : IUser ={
            firstName: firstName,
            email:email,
            lastName:lastName,
            gender:gender,
            mobileNo:mobileNo,
            password:hashPassword,
            isAdmin: true 
        };

        let admin = await new UserModel(newAdmin).save();
        if(admin){
            return response.status(201).json({message: 'Register Sucessfully...'});
        }
    } catch (error) {
        return ThrowError(response);
    }
};


/**
 * @usage : Login a Admin,
 * @url : 
 * @param : email, password
 * @method : POST
 * @access : PUBLIC 
 */

export const loginAdmin =async (request:Request, response:Response) => {
    try{
        let {email, password} = request.body;
        
        // verify user email, password
        let adminObj = await UserModel.findOne({email:email});

        if(!adminObj){
            return ThrowError(response, 401, 'Invalid Email address Plese chek your email');
        }

        let isMatch :boolean = await bcrypt.compare(password, adminObj.password)

        if(!isMatch){
            return ThrowError(response, 401, 'Invalid password....!!!!!' )
        }

        // creat token & send
        let payload = {
            id: adminObj._id,
            email: adminObj.email
        };
        let secretKey: string | undefined = process.env.JWT_SECRET_KEY;

        if (payload && secretKey) {
            let token = Jwt.sign(payload, secretKey, {
                expiresIn: 1000000
            });
            return response.status(200).json({
                msg: 'Login is Success',
                token: token,
                admin: adminObj
            });
        }

    }catch(err){
       return ThrowError(response);
    }    
};
