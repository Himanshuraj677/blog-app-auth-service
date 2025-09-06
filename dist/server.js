"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_js_1 = require("./lib/auth.js");
const cors_1 = __importDefault(require("cors"));
const profile_route_js_1 = __importDefault(require("./routes/profile.route.js"));
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.all('/api/auth/{*any}', (0, node_1.toNodeHandler)(auth_js_1.auth));
app.get("/api/me", async (req, res) => {
    const session = await auth_js_1.auth.api.getSession({
        headers: (0, node_1.fromNodeHeaders)(req.headers),
    });
    return res.json(session);
});
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express_1.default.json());
app.use('/api/profile', profile_route_js_1.default);
app.use(error_middleware_js_1.errorhandler);
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});
