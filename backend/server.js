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

// const JWT_SECRET = process.env.JWT_SECRET;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // "uploads" folder 
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   console.log("Warning: 'uploads/' directory does not exist.");
// }
// app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// // Frontend and backend connect 
// const allowedOrigins = ["https://elite-wear.onrender.com"];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// // API Routes
// app.use("/api/clothes", allClothesRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);

// // Serve frontend
// const frontendPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

///////////
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import allClothesRoutes from "./routes/allClothesRoutes.js";
import fs from "fs";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static folder for uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  console.log("Warning: 'uploads/' directory does not exist.");
}
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/clothes", allClothesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Serve frontend (dist folder)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all route: send index.html for React Router routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
