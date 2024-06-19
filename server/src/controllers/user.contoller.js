import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const user = await prisma.user.create({ data: data });
    console.log("User", user);
    delete user.password;
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(409).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export async function verifyUser(req, res) {
  try {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(409).send("That account don't exist");
    }
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        ...existingUser,
        verified: true,
      },
    });
    if (updatedUser) return res.status(201).send("User verified succesfully");
  } catch (e) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getUserDetails(req, res) {
  try {
    const user = req.user;
    if (user) return res.status(200).send(user);
    return res.status(404).send("User not found");
  } catch (e) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
