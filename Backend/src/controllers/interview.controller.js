import InterviewReport from "../models/interviewReport.model.js";
import generateAiInterviewReport from "../service/ai.service.js";
import { PDFParse } from "pdf-parse";

export const generateInterviewReport = async (req, res) => {
  const { selfDescription, jobDescription } = req.body;

  let resume;
  // parse resume file to text
  if (req.file.buffer) {
    const parser = new PDFParse(Uint8Array.from(req.file.buffer));
    const resumeText = await parser.getText();

    resume = resumeText.text;
  } else {
    resume = "";
  }

  const payload = await generateAiInterviewReport(
    resume,
    selfDescription,
    jobDescription,
  );

  if (!payload) {
    return res.status(401).json({ message: "Interview Report not generated" });
  }
  const newInterviewReport = await InterviewReport.create({
    user: req.userId,
    resume,
    selfDescription,
    jobDescription,
    matchScore: payload.matchScore,
    technicalQuestions: payload.technicalQuestions,
    behaviourQuestions: payload.behaviourQuestions,
    skillGaps: payload.skillGaps,
    preparationPlan: payload.preparationPlan,
    title: payload.title,
  });

  res.status(201).json({
    message: "interview report generated successfully",
    interviewReport: newInterviewReport,
  });
};

export const getInterviewReportById = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReport.findOne({ _id: interviewId });
  if (!interviewReport) {
    return res.status(401).json({ message: "Interview Report not fetched" });
  }
  res.status(200).json({
    message: "interview report fetched successfully",
    interviewReport,
  });
};

export const getAllInterview = async (req, res) => {
  const userId = req.userId;
  const interviewReports = await InterviewReport.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .select(
      "-resume -jobDescription -selfDescription -__v -technicalQuestions -behaviourQuestions -skillGaps -preparationPlan",
    );
  if (!interviewReports) {
    return res.status(401).json({
      message: "Someting went wrong, unable to fetch interview reports.",
    });
  }
  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
  });
};
