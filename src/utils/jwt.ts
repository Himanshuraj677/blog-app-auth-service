import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from './appError.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({userId}, JWT_SECRET, {expiresIn: '30d'});
    return accessToken;
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch (error: any) {
        throw new AppError("Unauthorized", 403);
    }
}