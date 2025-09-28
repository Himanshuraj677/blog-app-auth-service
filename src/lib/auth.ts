import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/db.js";
import { admin } from "better-auth/plugins"
import { ac, APP_ROLES } from "./permission.js";

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
        enabled: true,
        domain: process.env.COOKIE_DOMAIN,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    }
  },
  trustedOrigins: (process.env.TRUSTED_ORIGINS as string).split(","),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
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
