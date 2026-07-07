import express from "express";
import authRoutes from "./routes/auth.route.js";
import interviewRoutes from "./routes/interview.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

export default app;
