import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ArrowDownWideNarrow,
  Cpu,
  ChevronRight,
  NotebookText,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { getCurrentUser } from "../services/Auth";
import toast from "react-hot-toast";
import { InterviewContext } from "../context/InterviewContext";
import { getReportById } from "../services/Interview";
import { motion } from "motion/react";

const Interview = () => {
  const navigate = useNavigate();
  const { report, setReport } = useContext(InterviewContext);
  const [selectedOption, setSelectedOption] = useState("");
  const { interviewId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser();
      } catch (error) {
        toast.error(error.message || "Unauthorized");
        navigate("/login");
      }
    };

    const getReportDetail = async () => {
      try {
        setLoading(true);
        const result = await getReportById(interviewId);
        setReport(result.interviewReport);
      } catch (error) {
        toast.error(error.message || "Something went wrong...");
      } finally {
        setLoading(false);
      }
    };

    getUser();
    getReportDetail();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-12 py-10 bg-slate-100"
    >
      <div className="md:flex border-2 border-slate-400/60 bg-slate-200 min-h-160 px-4 py-3 rounded-2xl shadow-xl">
        {/* Left section */}
        <section className="border-b-2 md:border-slate-400/60 md:border-b-0 md:border-r-2 border-slate-400/60 w-full md:w-1/4 px-4 py-2 flex flex-col gap-6">
          <div className="w-full border-b border-slate-400/80 pb-6 flex items-center">
            <div
              onClick={() => navigate("/home")}
              className="w-5 h-5 p-1 shadow-lg text-white hover:bg-red-600/60 cursor-pointer transition  rounded-full flex items-center justify-center bg-red-800"
            >
              <X size={20} />
            </div>
          </div>
          <h3 className="text-center text-md font-semibold text-slate-700">
            AI Report Breakdown
          </h3>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(21,94,117,0.35)",
            }}
            onClick={() =>
              setSelectedOption(
                selectedOption === "technicalQuestions"
                  ? ""
                  : "technicalQuestions",
              )
            }
            className={`flex justify-between border border-slate-900 px-4 py-2 rounded-lg shadow-md text-left hover:bg-cyan-50 hover:text-black transition cursor-pointer ${selectedOption === "technicalQuestions" ? "bg-cyan-400/20 shadow-xl" : ""}`}
          >
            <div className="flex gap-2 items-center">
              <Cpu size={20} /> <p>Technical Questions</p>
            </div>
            <div
              className={
                selectedOption === "technicalQuestions" ? "" : "hidden"
              }
            >
              <ChevronRight />
            </div>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(21,94,117,0.35)",
            }}
            onClick={() =>
              setSelectedOption(
                selectedOption === "behaviourQuestions"
                  ? ""
                  : "behaviourQuestions",
              )
            }
            className={`flex justify-between border border-slate-900 px-4 py-2 rounded-lg shadow-md text-left hover:bg-cyan-50 hover:text-black transition cursor-pointer ${selectedOption === "behaviourQuestions" ? "bg-cyan-400/20 shadow-xl" : ""}`}
          >
            <div className="flex items-center gap-2">
              <UserRound size={20} /> <p>Behaviour Questions</p>
            </div>
            <div
              className={
                selectedOption === "behaviourQuestions" ? "" : "hidden"
              }
            >
              <ChevronRight />
            </div>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(21,94,117,0.35)",
            }}
            onClick={() =>
              setSelectedOption(
                selectedOption === "preparationPlan" ? "" : "preparationPlan",
              )
            }
            className={`flex justify-between border border-slate-900 px-4 py-2 rounded-lg shadow-md text-left hover:bg-cyan-50 hover:text-black transition cursor-pointer ${selectedOption === "preparationPlan" ? "bg-cyan-400/20 shadow-xl" : ""}`}
          >
            <div className="flex items-center gap-2">
              <NotebookText size={20} /> <p>Preparation Plan</p>
            </div>
            <div
              className={selectedOption === "preparationPlan" ? "" : "hidden"}
            >
              <ChevronRight />
            </div>
          </motion.button>
        </section>

        {/* Mid section */}
        <section className="w-full md:w-1/2 px-4 py-2 border-b-2 border-slate-400/60 mb-3 md:border-0 md:mb-0">
          <div className="mt-3 md:mt-0 border-2 border-cyan-800 px-3 py-2 rounded-3xl mb-5 text-center font-medium text-slate-900 text-lg bg-cyan-200/20 shadow-md">
            {report?.title}
          </div>

          {selectedOption === "" ? (
            <div className="mb-5 md:mb-0">
              <div className="flex items-center gap-2 text-lg">
                <ArrowDownWideNarrow size={20} /> <p>Job Description</p>
              </div>
              <div className="border-2 border-slate-400 px-4 py-3 rounded-lg mt-4 shadow-lg text-md text-slate-900">
                {report?.jobDescription}
              </div>
            </div>
          ) : (
            report[selectedOption]?.map((item) => (
              <div key={item._id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full border-2 border-slate-400 px-4 py-3 rounded-lg mb-5 shadow-md text-md text-slate-900"
                >
                  <div className="border-b border-slate-400 pb-2 mb-2">
                    <p>
                      <span className="text-slate-500">
                        {selectedOption === "preparationPlan"
                          ? "Day. "
                          : "Question. "}
                      </span>{" "}
                      {selectedOption === "preparationPlan"
                        ? item.day
                        : item.question}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="text-slate-500">
                        {selectedOption === "preparationPlan"
                          ? "Focus. "
                          : "Answer. "}
                      </span>{" "}
                      {selectedOption === "preparationPlan"
                        ? item.focus
                        : item.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </section>

        {/* Right section */}
        <section className="md:border-l-2 border-slate-400/60 w-full md:w-1/4 px-4 py-2">
          <div className="h-35 w-full border-b border-slate-400/60 mb-2 flex flex-col items-center">
            <h3 className="text-md font-semibold text-slate-700">
              Match Score
            </h3>

            <div className="w-20 h-20 mt-2">
              <CircularProgressbar
                minValue={0}
                maxValue={100}
                strokeWidth={4}
                value={report?.matchScore}
                text={`${report?.matchScore}%`}
              />
            </div>
          </div>

          <div className="mt-4 space-y-3 text-center">
            <h3 className="text-md font-semibold text-slate-700">Skill Gaps</h3>

            {report?.skillGaps.map((skill) => (
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 40px rgba(14,116,144,0.3)",
                }}
                key={skill}
                className="cursor-default flex items-center rounded-lg bg-cyan-400/10 border border-cyan-800 px-3 py-2 shadow-sm"
              >
                <span className="">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Interview;
