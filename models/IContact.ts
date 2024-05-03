import {Types } from "mongoose";

export interface IContact {
        user: Types.ObjectId
        firstName?: string;
        email?: string;
        mobileNo?:number;
        createdAt?: Date;
        updatedAt?: Date;

}


