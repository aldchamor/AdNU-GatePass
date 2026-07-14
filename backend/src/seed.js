import dotenv from "dotenv";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import connectDB from "./config/database.js";
import { Application } from "./models/application.model.js";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const sampleApplications = [
    { applicantName: "Miguel Torres", status: "Pending" },
    { applicantName: "Ana Reyes", status: "Rejected" },
    { applicantName: "David Lee", status: "Pending" },
    { applicantName: "Sofia Cruz", status: "Approved" },
    { applicantName: "Carlos Dela Peña", status: "Approved" },
];

const seed = async () => {
    try {
        await connectDB();
        await Application.deleteMany({}); // clear existing sample data
        await Application.insertMany(sampleApplications);
        console.log(`Seeded ${sampleApplications.length} sample applications.`);
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seed();
