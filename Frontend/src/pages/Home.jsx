import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { InterviewContext } from "../context/InterviewContext.jsx";
import { SyncLoader } from "react-spinners";
import { motion } from "motion/react";
import {
  FileUser,
  NotepadText,
  Sparkles,
  UserRoundArrowLeft,
  X,
} from "lucide-react";
import { getCurrentUser, handleLogout } from "../services/Auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  generateInterviewReport,
  getAllReports,
  getReportById,
} from "../services/Interview.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Home = () => {
  const context = useContext(AuthContext);
  const { loading, setLoading, reports, setReports } =
    useContext(InterviewContext);
  const { user, setUser, setIsLogedin } = context;
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [fileName, setFileName] = useState("");

  const clearResume = () => {
    setFileName("");
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser();
        setUser(result.user);
      } catch (error) {
        toast.error(error.message || "Unauthorized");
        navigate("/login");
      }
    };

    const getReports = async () => {
      try {
        const result = await getAllReports();
        setReports(result.interviewReports);
      } catch (error) {
        toast.error(error.message || "Failed to fetch reports");
      }
    };

    getUser();
    getReports();
  }, []);

  const handleUserLogout = async () => {
    try {
      setLoadingLogout(true);
      const result = await handleLogout();
      await getCurrentUser();
    } catch (error) {
      navigate("/home");
      setIsLogedin(false);
      toast.success("Logout successful");
    } finally {
      setLoadingLogout(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resumeFile = resumeInputRef.current?.files?.[0];

      if (!selfDescription && !resumeFile) {
        toast.error(
          "Atleast one field is required from Self Description or Resume.",
        );
        return;
      }
      const result = await generateInterviewReport(
        resumeFile,
        selfDescription,
        jobDescription,
      );
      toast.success("Report generated successfully.");
      const interviewReport = result.interviewReport;
      navigate(`/interview/${interviewReport._id}`);
    } catch (error) {
      toast.error(error.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="shadow-sm w-full border-b border-slate-200 bg-slate-100/80 backdrop-blur sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span
            onClick={() => {
              navigate("/home");
            }}
            className="cursor-pointer text-4xl font-black tracking-tight text-black"
          >
            Prep<span className="text-cyan-600">AI</span>
          </span>
          <button
            onClick={handleUserLogout}
            className="w-30 h-12 rounded-xl bg-cyan-500 px-3 py-2 text-md font-semibold text-white shadow-md transition hover:bg-cyan-600 cursor-pointer"
          >
            {loadingLogout ? (
              <SyncLoader size={8} color="white" margin={2} />
            ) : (
              <p className="flex items-center justify-center gap-2">Logout</p>
            )}
          </button>
        </div>
      </motion.nav>
      <main className="w-full px-8 py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex items-center justify-center"
        >
          <div className="h-full md:w-4/5 px-4 py-2">
            <h2 className="text-4xl font-black w-full text-center mb-4 text-slate-900">
              Create your custom Interview Plan
            </h2>

            <form onSubmit={handleFormSubmit}>
              <div className="border-2 border-slate-400/60 bg-slate-200 h-full px-4 py-3 rounded-2xl shadow-xl">
                <div className="md:flex">
                  <section className="md:border-r border-slate-400/60 w-full  md:w-1/2 px-2">
                    <div>
                      <label
                        htmlFor="jobDescription"
                        className="text-lg font-semibold text-slate-700 flex gap-2 mb-2 items-center"
                      >
                        <NotepadText className="text-cyan-700" />
                        Target Job Description
                      </label>
                      <textarea
                        onChange={(e) => setJobDescription(e.target.value)}
                        name="jobDescription"
                        id="jobDescripton"
                        required
                        placeholder="Paste the full job description here..."
                        className="resize-none h-90 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                      ></textarea>
                    </div>
                  </section>
                  <section className="md:border-l border-slate-400/60 w-full  md:w-1/2 px-2">
                    <div>
                      <label
                        htmlFor="selfDescription"
                        className="text-lg font-semibold text-slate-700 flex gap-2 items-center"
                      >
                        <UserRoundArrowLeft className="text-cyan-700" />
                        Quick Self Description
                      </label>
                      <div className="text-slate-500 mb-2">
                        <p>
                          {
                            "(Atleast one field is required from Self Description or Resume)"
                          }
                        </p>
                      </div>
                      <textarea
                        onChange={(e) => setSelfDescription(e.target.value)}
                        name="selfDescription"
                        id="selfDescription"
                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                        className="resize-none h-49 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                      ></textarea>
                    </div>

                    <div className="mt-2 mb-2 flex justify-center items-center gap-1 text-slate-500">
                      <div className="border w-2/5"></div>
                      <span>OR</span>
                      <div className="border w-2/5"></div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <label
                        htmlFor="resume"
                        className="text-lg font-semibold flex justify-center gap-2 mb-2 items-center w-11/12
                     rounded-xl bg-cyan-500 px-3 py-2 text-md text-white shadow-md transition hover:bg-cyan-600 cursor-pointer
                    "
                      >
                        <FileUser />
                        Upload Resume
                      </label>

                      <input
                        type="file"
                        accept=".pdf"
                        id="resume"
                        name="resume"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name)}
                        ref={resumeInputRef}
                      />
                      <div className="w-11/12 border-2 border-dashed border-cyan-800 px-3 py-1 rounded-lg bg-cyan-400/10 text-slate-900/80 flex items-center justify-between gap-2">
                        <p className="truncate">
                          {fileName || "No file selected..."}
                        </p>
                        {fileName && (
                          <button
                            type="button"
                            onClick={clearResume}
                            className="text-slate-700 hover:text-red-500 transition cursor-pointer"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
                <div className="w=full border border-slate-400/60 mt-2 mb-2"></div>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="flex h-12 gap-2 rounded-2xl bg-cyan-500 px-8 py-3 text-md font-semibold text-white shadow-md transition hover:bg-cyan-600 cursor-pointer"
                  >
                    {loading ? (
                      <SyncLoader size={9} color="white" margin={2} />
                    ) : (
                      <p className="flex gap-2">
                        <Sparkles />
                        Generate Report
                      </p>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Reports history */}
        <div className="w-full flex justify-center">
          {reports?.length === 0 ? (
            <div className="w-full text-center mt-10">
              <p className="font-black text-4xl text-slate-600">
                Check your all reports
              </p>
              <p className="mt-3 font-medium text-xl text-slate-500">
                No reports yet...
              </p>
            </div>
          ) : (
            <div className="md:w-4/5 text-center mt-10 mb-10   flex flex-col justify-center">
              <p className="mb-9 font-black text-4xl text-slate-600">
                Check your all reports
              </p>
              <div className="flex flex-wrap gap-5">
                {reports.map((item) => (
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
                    }}
                    key={item._id}
                    className="min-w-65 border-2 border-slate-400/60 bg-slate-200 px-4 py-2 rounded-xl shadow-xl"
                  >
                    <div className="border-b border-slate-400/60 py-2 mb-3">
                      <p className="text-lg text-slate-900">{item.title}</p>
                    </div>
                    <div className="w-full flex items-center justify-center mb-3">
                      <div className="h-15 w-15 ">
                        <CircularProgressbar
                          minValue={0}
                          maxValue={100}
                          strokeWidth={6}
                          value={item.matchScore}
                          text={`${item.matchScore}%`}
                        />
                      </div>
                    </div>
                    <div className="w-full items-center justify-center">
                      <button
                        onClick={() => navigate(`/interview/${item._id}`)}
                        className="mb-3 w-full h-12 rounded-xl bg-cyan-500 px-2 py-1 text-md font-semibold text-white shadow-sm transition hover:bg-cyan-600 cursor-pointer"
                      >
                        See full report
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
