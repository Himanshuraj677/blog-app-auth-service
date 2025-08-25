import { authService } from "../services/auth.service.js";
import { Request, Response } from "express";
import AppError from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../config/db.js";
export const authcontroller = {
  signup: async (req: Request, res: Response) => {
    const response = await authService.signup(req.body);
    return res.status(201).json(response);
  },

  login: async (req: Request, res: Response) => {
    const { user, token } = await authService.login(req.body);
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ only true in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 60 * 1000, // 15 mins
    });

    res.json({ success: true, message: "Login successful", user });
  },

  me: async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new AppError("Unauthorized", 403);
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      success: true,
      message: "user has been fetched successfully",
      user,
    });
  },
  logout: async (req: Request, res: Response) => {
    // Clear the accessToken cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });
  },
};
