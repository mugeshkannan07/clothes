import express from "express";
import ClothesModel from "../models/allClothSchema.js";
import upload from "../middleware/ClothsMulter.js";

const router = express.Router();
const IMAGE_URL = process.env.BASE_URL || "http://localhost:5000";


//  Route: Get all clothes
router.get("/", async (req, res) => {
  try {
    const clothes = await ClothesModel.find();
    
    const updatedClothes = clothes.map(item => ({
      ...item._doc,
      front: `${IMAGE_URL}/${item.front}`,
      back: `${IMAGE_URL}/${item.back}`
    }));

    res.json(updatedClothes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clothes", error });
  }
});

// category //
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {

    const clothes = await ClothesModel.find({ category });
    if (!clothes.length) {
      return res.status(404).json({ message: `No items found in ${category}` });
    }

    const updatedClothes = clothes.map(item => ({
      ...item._doc,
      front: `${IMAGE_URL}/${item.front}`,
      back: `${IMAGE_URL}/${item.back}`
    }));

    res.json(updatedClothes);
  } catch (error) {
    res.status(500).json({ message: `Error fetching ${category} clothes`, error });
    console.error(error);
  }
});

////////////
router.post("/add", upload.fields([{ name: "front" }, { name: "back" }]), async (req, res) => {
  try {
    const { name, id, price, oldprice, rating, category } = req.body;

    if (!req.files || !req.files.front || !req.files.back) {
      return res.status(400).json({ message: "Front and back images are required" });
    }

    const newClothing = new ClothesModel({
      name,
      id,
      price,
      oldprice,
      rating,
      category,
      front: req.files.front[0].filename,
      back: req.files.back[0].filename
    });

    await newClothing.save();
    res.status(201).json({ message: "Clothing item added successfully", data: newClothing });
  } catch (error) {
    res.status(500).json({ message: "Error adding clothing item", error });
  }
});

router.get('/allproduct', async (req, res) => {
  try{
    const data = await ClothesModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({message: "error fetch produc", error})
  }
})

export default router;
