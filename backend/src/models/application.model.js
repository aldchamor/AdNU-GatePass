import mongoose, { Schema } from "mongoose";

// Minimal Application model to power the Dashboard stats and Applicants table.
// Only captures what's currently displayed: applicant name, status, and date/time.
// More fields (vehicle, affiliate, driver's license, etc.) can be added later
// once the full application submission flow is built.
const applicationSchema = new Schema(
    {
        applicantName: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        }
    },
    {
        timestamps: true // createdAt is used as the application's Date/Time
    }
);

export const Application = mongoose.model("Application", applicationSchema);
