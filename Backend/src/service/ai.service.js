import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import "dotenv/config";

const interviewReportJsonSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "integer",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job describe.",
    },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "The technical question can be asked in the interview.",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "answer"],
      },
      description:
        "Technical questions that can be asked in the interview along with how to answer them",
    },
    behaviourQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "The behavioural question can be asked in the interview.",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "answer"],
      },
      description:
        "Behavioural questions that can be asked in the interview along with how to answer them",
    },
    skillGaps: {
      type: "array",
      items: {
        type: "string",
        description:
          "The skill which the candidate is lacking.Mention only technologies name.",
      },
      description: "List of skill gaps in the candidate's profile.",
    },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            description:
              "The day number in the preparation plan, starting from 1.",
          },
          focus: {
            type: "string",
            description:
              "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc..",
          },
        },
        required: ["day", "focus"],
      },
      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
    },
    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated.",
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behaviourQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAiInterviewReport = async (
  resume,
  selfDescription,
  jobDescription,
) => {
  const prompt = `
                    Generate a concise interview report.

                    Resume:
                    ${resume}


                    Self Description:
                    ${selfDescription}

                    Job Description:
                    ${jobDescription}

                    Keep answers concise and short.
                `;

  const interaction = await client.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: interviewReportJsonSchema,
    },
  });

  const interviewReport = interviewReportSchema.parse(
    JSON.parse(interaction.output_text),
  );

  return interviewReport;
};

export default generateAiInterviewReport;
