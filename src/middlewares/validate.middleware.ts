import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error)
    }
    next();
  };
