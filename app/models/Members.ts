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
  },
  password: {
    type: String,
    required: true,
  },
});

const Member: Model<IUser> =
  models?.Member || model<IUser>("Member", userSchema);
export default Member;
