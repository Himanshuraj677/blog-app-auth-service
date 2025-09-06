import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js"; 
import cors from "cors"
import profileRouter from "./routes/profile.route.js";
import { errorhandler } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
     headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
  });
  
  // Mount express json middleware after Better Auth handler
  // or only apply it to routes that don't interact with Better Auth
  app.use(express.json());
  app.use('/api/profile', profileRouter);
app.use(errorhandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});