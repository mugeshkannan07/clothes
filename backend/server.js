// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/userRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import allClothesRoutes from "./routes/allClothesRoutes.js";
// import fs from "fs";

// dotenv.config();
// connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORRECT CORS USAGE
// app.use(cors({
//   origin: "https://elite-wear.onrender.com", 
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// // Static folder for uploads
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   console.warn("Warning: 'uploads/' directory does not exist.");
// }
// app.use("/uploads", express.static(uploadsDir)); 

// // API Routes
// app.use("/api/clothes", allClothesRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);

// // Serve frontend (React build)
// const frontendPath = path.join(__dirname, "../frontend/dist");
// if (fs.existsSync(frontendPath)) {
//   app.use(express.static(frontendPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// } else {
//   console.warn("Warning: Frontend build not found. Make sure you built the frontend.");
// }

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import allClothesRoutes from "./routes/allClothesRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: "https://elite-wear.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Static folder for uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  console.warn("Warning: 'uploads/' directory does not exist.");
}
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/clothes", allClothesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Serve frontend (React build)
const frontendPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.warn("Warning: Frontend build not found. Make sure you built the frontend.");
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



