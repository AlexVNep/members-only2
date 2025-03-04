import { Model } from "mongoose";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IPost extends Document {
  _id: string;
  title: string;
  message: string;
  createdBy: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = models?.Post || model<IPost>("Post", postSchema);
export default Post;
