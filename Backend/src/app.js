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
    origin: "https://prep-ai-nine-kohl.vercel.app",
    credentials: true,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

export default app;
