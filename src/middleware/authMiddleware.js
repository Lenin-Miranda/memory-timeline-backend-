import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader); // DEBUG

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token); // DEBUG

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded); // DEBUG

    req.userId = decoded.userId;
    console.log("Set req.userId to:", req.userId); // DEBUG

    next();
  } catch (error) {
    console.log("Error:", error.message); // DEBUG
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
