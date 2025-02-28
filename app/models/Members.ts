import { Model } from "mongoose";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  membership?: boolean;
  password?: string;
  admin?: boolean;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  membership: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User: Model<IUser> = models?.User || model<IUser>("User", userSchema);
export default User;
