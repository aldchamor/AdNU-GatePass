import mongoose, { Schema } from "mongoose";

// Records notable actions in the system. Scoped for now to
// application approve/reject events; more action types (e.g. new
// application submissions) can be added later as those flows exist.
const auditLogSchema = new Schema(
    {
        action: {
            type: String,
            enum: ["Approved", "Rejected"],
            required: true
        },
        applicantName: {
            type: String,
            required: true,
            trim: true
        },
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: "Application",
            required: true
        }
    },
    {
        timestamps: true // createdAt is used as the log entry's timestamp
    }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
