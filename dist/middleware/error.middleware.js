"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
const zod_1 = require("zod");
const errorhandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues[0].message,
        });
    }
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "Unknown server error";
    // console.error(message);
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorhandler = errorhandler;
