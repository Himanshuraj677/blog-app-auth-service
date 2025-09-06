"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const db_js_1 = require("../config/db.js");
exports.profileController = {
    getProfile: async (req, res, next) => {
        const { id } = req.params;
        const profile = await db_js_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                profile: {
                    select: {
                        bio: true,
                        website: true,
                        social: true,
                    },
                },
            },
        });
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: "User not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile has been fetched successfully",
            error: null,
            data: profile,
        });
    },
    updateProfile: async (req, res, next) => {
        const userId = req.params.id;
        if (userId != req.user.id)
            return res.status(401).json({ success: false, message: "Not have required permission" });
        const { name, image, bio, website, social } = req.body;
        const existingUser = await db_js_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: "User not found",
                data: null,
            });
        }
        const updatedUser = await db_js_1.prisma.user.update({
            where: { id: userId },
            data: {
                name,
                image,
                profile: {
                    upsert: {
                        update: {
                            bio,
                            website,
                            social,
                        },
                        create: {
                            bio,
                            website,
                            social,
                        },
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                profile: {
                    select: {
                        bio: true,
                        website: true,
                        social: true,
                    },
                },
            },
        });
        res.json(updatedUser);
    },
};
