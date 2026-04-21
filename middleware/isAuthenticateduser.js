import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token"
      });
    }

    // attach user data to request
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };

    next();

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Unauthorized - Invalid token"
    });
  }
};

export default authenticateToken;