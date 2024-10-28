const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    // req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = authenticateToken;
