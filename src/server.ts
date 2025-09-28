import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js"; 
import cors from "cors"
import profileRouter from "./routes/profile.route.js";
import { errorhandler } from "./middleware/error.middleware.js";

const app = express();

// Parse trusted origins from env
const allowedOrigins = (process.env.TRUSTED_ORIGINS as string).split(",");

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get("/api/auth/me", async (req, res) => {
 	const session = await auth.api.getSession({
     headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
  });
app.all('/api/auth/{*any}', toNodeHandler(auth));
  
  // Mount express json middleware after Better Auth handler
  // or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use('/api/profile', profileRouter);
app.use(errorhandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});