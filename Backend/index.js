import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
dotenv.config();

const app = express();

// Connect DB first
connectDB();

// CORS should come before routes
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);


// Test Route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the backend!",
    timestamp: new Date().toISOString(),
    success: true
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


