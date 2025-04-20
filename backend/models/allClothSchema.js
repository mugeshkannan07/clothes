import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["arrives", "mens", "womens", "kids"] },
  oldprice: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  size: { type: [String], required: true },
  colors: { type: [String], required: true },
  rating: { type: Number, required: true },
  front: { type: String, required: true },
  back: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const ClothesModel = mongoose.model("allcloths", ClothesSchema);
export default ClothesModel;
