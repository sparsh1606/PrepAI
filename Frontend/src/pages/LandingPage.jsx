import React, { useEffect } from "react";
import {
  FileText,
  Upload,
  User,
  Sparkles,
  Target,
  Brain,
  FileCheck,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/Auth";
import { motion } from "motion/react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLogedin, setIsLogedin } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser();
        setIsLogedin(true);
      } catch (error) {
        setIsLogedin(false);
      }
    };

    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="shadow-sm w-full border-b border-slate-200 bg-slate-100/80 backdrop-blur sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-4xl font-black tracking-tight text-black">
            Prep<span className="text-cyan-600">AI</span>
          </span>
          <button
            onClick={() => navigate(isLogedin ? "/" : "/login")}
            className="rounded-xl bg-cyan-500 px-6 py-2 text-lg font-semibold text-white shadow-md transition hover:bg-cyan-600 cursor-pointer flex justify-center items-center"
          >
            {isLogedin ? "Get started" : "Login"}
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.7 }}
        className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-black text-slate-900">
          Prepare Smarter with <span className="text-cyan-600">AI</span>
          <br />
          <div className="border-2 border-cyan-800 inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold tracking-wide uppercase mb-6">
            AI Interview Preparation
          </div>
          <br />
          Know if you're a fit <span className="text-cyan-600">before</span> the
          interview does
        </h1>
        <p className="mt-6 text-md text-slate-500 max-w-2xl mx-auto">
          Paste the job description, upload your resume, and tell us about
          yourself. PrepAI analyzes the gap between you and the role — then
          builds your plan to close it.
        </p>
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              document
                .getElementById("howItWorks")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 cursor-pointer rounded-lg border border-cyan-500 text-slate-700 font-semibold hover:border-cyan-500 hover:text-cyan-600 transition-colors"
          >
            See How It Works
          </motion.button>
        </div>
      </motion.section>

      {/* How it Works */}
      <div
        id="howItWorks"
        className="m-9 border-b border-slate-400/0 w-8"
      ></div>
      <motion.section
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="border-b border-slate-400/60 max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-5xl font-black text-center">
          How <span className="text-cyan-600">PrepAI</span> Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
            }}
          >
            <Card
              icon={<FileText className="text-cyan-500" size={40} />}
              title="Paste Job Description"
            />
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
            }}
          >
            <Card
              icon={<Upload className="text-cyan-500" size={40} />}
              title="Upload Resume"
            />
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
            }}
          >
            <Card
              icon={<User className="text-cyan-500" size={40} />}
              title="Self Description"
            />
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
            }}
          >
            <Card
              icon={<Sparkles className="text-cyan-500" size={40} />}
              title="Generate AI Report"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="border-b border-slate-400/60 max-w-7xl mx-auto px-6 py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center">
            <span className="text-cyan-600">AI</span> Powered Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<Target className="text-cyan-500" />}
                title="Job Match Score"
                desc="Know how well your profile matches the job."
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<Brain className="text-cyan-500" />}
                title="Skill Gap Analysis"
                desc="Find missing skills before interviews."
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<FileCheck className="text-cyan-500" />}
                title="Resume Optimizer"
                desc="Generate ATS friendly resumes using AI."
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<Sparkles className="text-cyan-500" />}
                title="Technical Questions"
                desc="AI generates technical interview questions."
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<User className="text-cyan-500" />}
                title="Behavior Questions"
                desc="Practice HR interview questions."
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(6,182,212,0.25)",
              }}
            >
              <Feature
                icon={<Target className="text-cyan-500" />}
                title="Preparation Plan"
                desc="Get your personalized study roadmap."
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="py-20 text-center px-6"
      >
        <h2 className="text-6xl font-bold">
          Ready to Crack Your <span className="text-cyan-500">Interview?</span>
        </h2>

        <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
          Analyze your resume, identify skill gaps, prepare technical &
          behavioral questions and optimize your resume using AI.
        </p>

        <button
          onClick={() => navigate(isLogedin ? "/" : "/login")}
          className="mt-8 w-xl rounded-xl bg-cyan-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-cyan-600 cursor-pointer"
        >
          Get Started
        </button>
      </motion.section>
    </div>
  );
};

const Card = ({ icon, title }) => (
  <div className="border-2 border-slate-400/50 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

const Feature = ({ icon, title, desc }) => (
  <div className="border-2 border-slate-400/50 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <div className="mb-4">{icon}</div>

    <h3 className="text-xl font-semibold">{title}</h3>

    <p className="text-slate-600 mt-2">{desc}</p>
  </div>
);

export default LandingPage;
