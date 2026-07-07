import express from "express";
import {
  generateInterviewReport,
  getAllInterview,
  getInterviewReportById,
} from "../controllers/interview.controller.js";
import { authenticationMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";

const router = express.Router();

router.post(
  "/generate-interview-report",
  authenticationMiddleware,
  upload.single("resume"),
  generateInterviewReport,
);

router.get(
  "/report/:interviewId",
  authenticationMiddleware,
  getInterviewReportById,
);

router.get("/report", authenticationMiddleware, getAllInterview);

export default router;
