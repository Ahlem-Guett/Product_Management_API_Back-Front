import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product";

export interface ICategory extends Document {
  name: string;
  description: string;
  product: IProduct[];
}

export const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  description: { type: String, required: true },
  product: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
