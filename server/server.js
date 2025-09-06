import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Auth routes
app.use("/api/v1/auth", authRoutes);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 and error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    if (!process.env.URL) {
      console.warn("Warning: env URL is not set; DB will fail to connect.");
    }
    if (!process.env.JWT_SECRET) {
      console.warn(
        "Warning: JWT_SECRET not set; signed cookies will use an empty secret."
      );
    }
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();
