import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../shared/auth-guard";

export interface IUser extends Document {
  email: string;
  password: string;
  role: Role;
}

export const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.CLIENT,
  },
});

export default mongoose.model<IUser>("User", UserSchema);

export type Credentials = {
  email: string;
  password: string;
};
