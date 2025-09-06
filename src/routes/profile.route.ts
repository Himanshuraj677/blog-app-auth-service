import { Router } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { profileController } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/:id', asyncHandler(profileController.getProfile));
router.put("/:id", authMiddleware, asyncHandler(profileController.updateProfile))

export  default router;