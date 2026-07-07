import axios from "axios";

const api = axios.create({
  baseURL: "https://prepai-vli9.onrender.com/api/auth",
  withCredentials: true,
});

export const handleLogin = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const handleRegister = async (username, email, password) => {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Register failed");
  }
};

export const handleLogout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unaithorized");
  }
};
