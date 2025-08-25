import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { errorhandler } from './middlewares/error.middleware.js';
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,               
  }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.use(errorhandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
