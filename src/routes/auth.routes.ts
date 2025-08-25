import { Router } from "express";
import { authcontroller } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema } from "../schemas/signup.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema } from "../schemas/login.schema.js";

const router = Router();

router.post('/signup', validate(signupSchema), asyncHandler(authcontroller.signup));
router.post('/signin', validate(loginSchema), asyncHandler(authcontroller.login));
router.get('/me', asyncHandler(authcontroller.me));
router.post('/logout', asyncHandler(authcontroller.logout))
export default router;