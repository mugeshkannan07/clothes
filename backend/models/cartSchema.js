import mongoose, { Types } from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true,  },
  ProductId:{ type: Types.ObjectId, required: true},
  Name: { type: String, required: true,  },
  Image: { type: String, required: true,  },
  Price: { type: Number, required: true,  },
  Quantity: { type: Number, required: true,  },
});

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;

