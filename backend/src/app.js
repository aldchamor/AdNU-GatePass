import express from "express";
import cors from "cors";

// Routes import - only importing account routes
import accountRoutes from "./routes/account.route.js";

const app = express();  // create an express app

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes declaration
// Base URL: http://localhost:4000/api/v1/accounts/...
app.use("/api/v1/accounts", accountRoutes);

export default app;