import { Request, Response,response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../../schemas/admin/adminSchema";
import { IUser } from "../../models/IUser";
import { ThrowError } from "../../utils/ErrorUtils";


/**
 * @usage : Register a admin,
 * @url :  http://localhost:1999/api/users/register-user
 * @param : firstName,lastName,gender,email,password,mobileNo
 * @method : POST
 * @access : PUBLIC
 */
export const registerAdmin = async (request: Request, response: Response) => {
  try {
    let { firstName, lastName, gender, email, password, mobileNo } =
      request.body;

    let adminobj = await AdminModel.findOne({ email: email });

    if (adminobj) {
      return response
        .status(401)
        .json({ message: "Admin Is Alredy Exist...." });
    }
    // hash password
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    let newAdmin: IUser = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      gender: gender,
      mobileNo: mobileNo,
      password: hashPassword,
      isAdmin: true,
    };

    let admin = await new AdminModel(newAdmin).save();
    if (admin) {
      return response.status(201).json({ message: "Register Sucessfully..." });
    }
  } catch (error) {
    return ThrowError(response);
  }
};

/**
 * @usage : Login  Admin,
 * @url : http://localhost:1999/api/admin/login-admin
 * @param : email, password
 * @method : POST
 * @access : PUBLIC
 */



export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let admin = await AdminModel.findOne({ email: email, isdelete: false });
    // console.log("admin is ", admin);

    if (!admin) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    let checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    let payload = {
      adminId: admin._id
    };
    
    // console.log("paylod is :",payload);
    
    let SECRETE_KEY: string | undefined = process.env.SECRETE_KEY;
    if (payload && SECRETE_KEY) {
      let token = jwt.sign(payload, SECRETE_KEY);
      // console.log("token", token);

      return res.status(200).json({ token, message: "Login successful" });
    }
  } catch (error) {
    return ThrowError(response);
  }
}

/**
 * @usage : GET ALL ADMIN
 * @url : http://localhost:1999/api/admin/get-All-Admin
 * @param : adminVerifyToken
 * @method : POST
 * @access : PUBLIC
 */

export const getAllAdmin = async (req:Request, res:Response)=>{
  try {
    let admin = await AdminModel.find({
      isAdmin: true,
      isdelete: false,
    });
    // console.log("Admin is : ", admin);
    if (!admin) {
      return res.status(404).json({message: "Admin Data Not Found!!!"});
    }
    res.status(200).json(admin);
  } catch (error) {
    return ThrowError(response);
  }
}


/**
 * @usage : GET SPESIFIC ADMIN
 * @url : http://localhost:1999/api/admin/get-Admin
 * @param : adminId, adminVerifyToken
 * @method : GET
 * @access : PUBLIC
 */

export const getAdmin = async (req: Request, res: Response) => {
  try{
    const adminId = req.query.adminId; 

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }
    let admin = await AdminModel.findById(adminId);
    // console.log(admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Foud...."});
    }
    res.status(200).json(admin);
  } catch (error) {
    return ThrowError(response);
  }
}

/**
 * @usage : GET SPESIFIC ADMIN
 * @url : http://localhost:1999/api/admin/
 * @param : adminId , adminVerifyToken
 * @method : PUT
 * @access : PUBLIC
 */


export const updateAdmin = async (req: Request, res: Response) => {
  try {
    let admin = await AdminModel.findById(req.query.adminId);
    if (!admin) {
      return res.status(404).json({ message: `Admin Not Found...` });
    }
    admin = await AdminModel.findByIdAndUpdate(admin._id, { ...req.body });
    res.status(201).json({ admin, message: `Admin Updated Successfully...` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};


/**
 * @usage : DELETE
 * @url : http://localhost:1999/api/admin/delete-Admin
 * @param : adminId , adminVerifyToken
 * @method : DELETE
 * @access : PUBLIC
 */

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    let admin = await AdminModel.findById(req.query.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found..." });
    }
    admin = await AdminModel.findByIdAndUpdate(admin._id, { isDelete: true });
    res.status(200).json({ admin, message: `Admin Deleted Succesfully...` });
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
      let admin = await AdminModel.findById(req.query.adminId);
      if (!admin) {
          return res.json({ message: `Admin Not Found....Please try again..` });
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
      admin = await AdminModel.findByIdAndUpdate(req.user._id, { password: hashPassword });
      res.status(200).json({ message: 'Password 🔑 changed successfully🔑🔑🔑🔑' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error..${console.error()}` });
  }
}