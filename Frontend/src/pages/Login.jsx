import React, { useContext, useState } from "react";
import { handleLogin } from "../services/Auth.js";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const context = useContext(AuthContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await handleLogin(email, password);

      toast.success(result.message || "Login successful");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-slate-200 rounded-3xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">
            Login to your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email and password to continue.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-cyan-500 px-4 py-3 text-md font-semibold text-white shadow-md transition hover:bg-cyan-600 cursor-pointer flex justify-center items-center"
          >
            {loading ? (
              <SyncLoader size={9} color="white" margin={2} />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:text-cyan-700 cursor-pointer"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
