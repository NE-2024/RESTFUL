import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checker = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw new Error("No token found!");
    }
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1]; // Bearer token

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user from the token
    const user = prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });
    //CHECKING THE USER
    if (!user) {
      throw new Error("User not found!");
    }
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ error: "Token expired" });
    } else {
      res.status(400).json({ error: error.message });
    }
    res.locals.user = null;
  }
};
