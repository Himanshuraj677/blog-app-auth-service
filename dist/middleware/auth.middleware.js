"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_js_1 = require("../lib/auth.js");
const node_1 = require("better-auth/node");
const authMiddleware = ({ optional } = { optional: false }) => {
    return async (req, res, next) => {
        try {
            const cookie = req.headers.cookie;
            if (!cookie) {
                if (optional)
                    return next();
                return res
                    .status(403)
                    .json({
                    success: false,
                    message: "Unauthorized",
                    redirect: "/?login=true",
                });
            }
            const session = await auth_js_1.auth.api.getSession({
                headers: (0, node_1.fromNodeHeaders)(req.headers),
            });
            if (!session?.user) {
                if (optional)
                    return next();
                return res
                    .status(401)
                    .json({ success: false, message: "Unauthorized" });
            }
            // attach user to req
            req.user = session.user;
            return next();
        }
        catch (err) {
            if (optional)
                return next();
            console.error("Auth check failed:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
exports.authMiddleware = authMiddleware;
