import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model.js";
import dotenv from "dotenv";
dotenv.config();

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
