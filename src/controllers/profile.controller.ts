import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db.js";

export const profileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const profile = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            bio: true,
            website: true,
            social: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile has been fetched successfully",
      error: null,
      data: profile,
    });
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    if (userId != req.user.id) return res.status(401).json({success: false, message: "Not have required permission"});
    
    const { name, image, bio, website, social } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
        data: null,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        profile: {
          upsert: {
            update: {
              bio,
              website,
              social,
            },
            create: {
              bio,
              website,
              social,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            bio: true,
            website: true,
            social: true,
          },
        },
      },
    });

    res.json(updatedUser);
  },
};
