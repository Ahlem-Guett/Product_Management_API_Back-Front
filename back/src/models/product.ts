import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: ICategory;
  stock: number;
  deleted: boolean;
}

export interface IFilterProduct extends Document {
  minPrice: number;
  maxPrice: number;
}

export const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  stock: { type: Number, required: true },
  deleted: { type: Boolean, default: false },
});

export const ProductFilterSchema: Schema<IFilterProduct> = new Schema({
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
