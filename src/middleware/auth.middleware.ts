import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const authMiddleware = (
  { optional }: { optional: boolean } = { optional: false }
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) {
        if (optional) return next();
        return res
          .status(403)
          .json({
            success: false,
            message: "Unauthorized",
            redirect: "/?login=true",
          });
      }
      const session = await auth.api.getSession({
     headers: fromNodeHeaders(req.headers),
    });

      if (!session?.user) {
        if (optional) return next();
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      // attach user to req
      (req as any).user = session.user;

      return next();
    } catch (err) {
      if (optional) return next();
      console.error("Auth check failed:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
