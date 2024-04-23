import { Request,Response, response } from "express";
import bcrypt from "bcrypt" 
import Jwt  from "jsonwebtoken";
import AdminModel from "../../schemas/admin/adminSchema";
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

        let adminobj = await AdminModel.findOne({email:email});

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

        let admin = await new AdminModel(newAdmin).save();
        if(admin){
            return response.status(201).json({message: 'Register Sucessfully...'});
        }
    } catch (error) {
        return ThrowError(response);
    }
};


/**
 * @usage : Login  Admin,
 * @url : 
 * @param : email, password
 * @method : POST
 * @access : PUBLIC 
 */

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    let admin = await AdminModel.findOne({
      email: req.body.email,
      isDelete: false,
    });
console.log('admin is :',admin);

    if (!admin) {
      return res.status(404).json({
        message: `Email Not Found....`,
      });
    }

    let checkPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!checkPassword) {
      return res.status(401).json({message: `Password is Not Match....`});
    }

    let token: string = Jwt.sign({ adminId: admin._id }, "Admin");

    res.status(200).json({ token, message: `Login Successfully.` });
  } catch (error) {
    return ThrowError(response);
}
};