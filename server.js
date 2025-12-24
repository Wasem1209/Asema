require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./routes/track");

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: [
    "https://dhl-delivery.vercel.app", // production frontend
    "http://localhost:3000",           // local dev
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Explicitly handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

app.use(trackRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
