import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/db.js";
import { admin } from "better-auth/plugins"
import { ac, APP_ROLES } from "./permission.js";


export const auth = betterAuth({
  trustedOrigins: [process.env.FRONTEND_URL as string],
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  plugins: [
        admin({
          ac,
          roles: APP_ROLES
        }) 
    ]
});
