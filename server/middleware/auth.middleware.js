import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Verify user access
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });

    const accessToken = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(400).json({ message: "User not found" });

      req.user = user;

      next();
    } catch (error) {
      if ((error.name = "TokenExpiredError"))
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: error.message });
  }
};
