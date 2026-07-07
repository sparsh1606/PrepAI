import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const behaviourQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    jobDescription: {
      type: String,
      required: true,
    },
    selfDescription: {
      type: String,
    },
    resume: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviourQuestions: [behaviourQuestionSchema],
    skillGaps: {
      type: [String],
      default: [],
    },
    preparationPlan: [preparationPlanSchema],
  },
  { timestamps: true },
);

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

export default InterviewReport;
