import { comparePassword, hashPassword } from "../utils/password.js";
import { prisma } from "../config/db.js";
import { generateTokens } from "../utils/jwt.js";
import { signupType } from "../schemas/signup.schema.js";
import { loginType } from "../schemas/login.schema.js";
import AppError from "../utils/appError.js";

export const authService = {
  signup: async ({ fullName, email, password }: signupType) => {
    const passwordHash = await hashPassword(password);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("Email already exist", 409);
    }
    const user = await prisma.user.create({
      data: { email, fullName, passwordHash },
    });
    const token = generateTokens(user.id);
    return { user, token };
  },
  login: async ({ email, password }: loginType) => {
    const userFromDb = await prisma.user.findUnique({ where: { email } });
    if (!userFromDb) throw new AppError("Email is not registered", 401);

    // Check password
    const isSame = await comparePassword({
      password,
      hashedPassword: userFromDb.passwordHash,
    });
    if (!isSame) throw new AppError("Password is incorrect", 409);

    // Remove password hash before returning
    const { passwordHash, ...user } = userFromDb;

    const token = generateTokens(user.id);
    return { user, token };
  },
};
