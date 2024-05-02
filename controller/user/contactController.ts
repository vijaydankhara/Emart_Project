import { Request, Response } from 'express';
import contactModel from '../../schemas/user/contactSchema';
import { ThrowError } from '../../utils/ErrorUtils';


// SEND REQUEST USER
export const sendRequestUser = async (req: Request, res: Response) => {
    try {
        let user = await contactModel.findOne({name: req.user.name});
        // console.log(user);
        if(user){
            return res.status(400).json({ message: `User is Already Sending Request...`});
        }
        user = await contactModel.create({
            ...req.body,
            user:req.user._id
        });
        res.status(201).json({admin: user, message: `New Request added SuccesFully...`});   
    } catch (error) {
        return ThrowError(res);
    }
}