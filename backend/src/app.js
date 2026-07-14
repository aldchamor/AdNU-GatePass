import express from "express";
import cors from "cors";

// Routes import
import accountRoutes from "./routes/account.route.js";
import applicationRoutes from "./routes/application.route.js";
import auditLogRoutes from "./routes/auditLog.route.js";

const app = express();  // create an express app

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://ad-nu-gate-pass.vercel.app"],
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes declaration
// Base URL: http://localhost:4000/api/v1/accounts/...
app.use("/api/v1/accounts", accountRoutes);
// Base URL: http://localhost:4000/api/v1/applications/...
app.use("/api/v1/applications", applicationRoutes);
// Base URL: http://localhost:4000/api/v1/audit-logs/...
app.use("/api/v1/audit-logs", auditLogRoutes);

export default app;
