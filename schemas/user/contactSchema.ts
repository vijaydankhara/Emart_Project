import mongoose, { Schema, Document } from 'mongoose';

interface IContact extends Document {
    user: Schema.Types.ObjectId;
    firstName: string;
    email: string;
    mobileNo: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

const contactSchema = new mongoose.Schema<IContact>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    firstName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const contactModel = mongoose.model<IContact>('contacts', contactSchema);
export default contactModel;
