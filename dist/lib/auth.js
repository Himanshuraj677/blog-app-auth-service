"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const db_js_1 = require("../config/db.js");
const plugins_1 = require("better-auth/plugins");
const permission_js_1 = require("./permission.js");
exports.auth = (0, better_auth_1.betterAuth)({
    trustedOrigins: [process.env.FRONTEND_URL],
    database: (0, prisma_1.prismaAdapter)(db_js_1.prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    plugins: [
        (0, plugins_1.admin)({
            ac: permission_js_1.ac,
            roles: permission_js_1.APP_ROLES
        })
    ]
});
