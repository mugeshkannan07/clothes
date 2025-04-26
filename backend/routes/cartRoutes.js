import express from "express";
import CartModel from "../models/cartSchema.js";
import mongoose from "mongoose";

const router = express.Router();

// Add to Cart //
router.post("/add", async (req, res) => {
  try {
    const { userId, ProductId, Image, Name, Price, Quantity } = req.body;

    if (!userId || !ProductId || !Image || !Name || !Price || !Quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingItem = await CartModel.findOne({ userId, ProductId });

    if (existingItem) {
      // existingItem.Quantity += Quantity;  
      existingItem.Quantity += parseInt(Quantity);
      await existingItem.save();
      return res.status(200).json({ message: "Quantity updated successfully", cart: existingItem });
     
    } else {
      const cart = new CartModel({ userId, ProductId, Image, Name, Price, Quantity });
      await cart.save();
      return res.status(201).json({ message: "Item added to cart", cart });
    }

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Error adding to cart", error });
  }
});

// Get cart userId //
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartModel.find({ userId });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});


// Remove from Cart //
router.delete("/remove/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id)) {
        console.error('Invalid cart ID:', Id);
        return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const deletedItem = await CartModel.findByIdAndDelete(Id);
    if (!deletedItem) {
        console.error('Cart item not found:', Id);
        return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
} catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});

export default router;
