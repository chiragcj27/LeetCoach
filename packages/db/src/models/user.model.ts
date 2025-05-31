import { model, Schema } from "mongoose";

export interface IUser {
    email: string;
    password?: string;
    name: string;
    googleId?: string;
    picture?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    name: { type: String, required: true },
    googleId: { type: String, required: false, unique: true, sparse: true },
    picture: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<IUser>("User", userSchema);