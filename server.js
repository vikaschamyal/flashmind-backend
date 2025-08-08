const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const ankiRoutes = require("./routes/ankiRoutes");

const app = express();

// ✅ Allow both local and deployed frontend origins
const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://flashmind-livid.vercel.app"       // deployed frontend on Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // ✅ If using cookies or auth headers
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/anki", ankiRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(process.env.PORT || 8000, () => {
    console.log("🚀 Server running on port 8000");
  });
}).catch(err => console.error("❌ MongoDB connection error:", err));
