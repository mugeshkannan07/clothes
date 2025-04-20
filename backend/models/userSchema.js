import mongoose from "mongoose";

const ProductUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const ProductUserModel = mongoose.model("User", ProductUserSchema);
export default ProductUserModel;
