import axios from "axios";
import { useParams } from "react-router";

const api = axios.create({
  baseURL: "http://localhost:3000/api/interview",
  withCredentials: true,
});

export const generateInterviewReport = async (
  resumeFile,
  selfDescription,
  jobDescription,
) => {
  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await api.post("/generate-interview-report", formData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate report.",
    );
  }
};

export const getReportById = async (interviewId) => {
  try {
    const response = await api.get(`/report/${interviewId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch report");
  }
};

export const getAllReports = async () => {
  try {
    const response = await api.get("/report");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch reports");
  }
};
