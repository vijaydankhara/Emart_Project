import mongoose from "mongoose";
import { IUser } from "../models/IUser";

const userSchema = new mongoose.Schema<IUser>({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    gender: { type: String, enum: ['Male', 'Female'] },
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    mobileNo: { type: Number, require: true, unique: true},
    isAdmin: {type: Boolean, default: false},
    isdelete: {type: Boolean,  default: false}
},
{
    versionKey: true,
    timestamps: true
});

const UserModel = mongoose.model<IUser>('users', userSchema);

export default UserModel;