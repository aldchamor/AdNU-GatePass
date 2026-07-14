import { Application } from "../models/application.model.js";
import { AuditLog } from "../models/auditLog.model.js";

// Formats a Mongo date into "YYYY-MM-DD HH:MM AM/PM" to match the frontend's
// existing display format (e.g. "2026-07-01 11:02 AM").
const formatDateTime = (date) => {
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");

    const datePart = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    let hours = d.getHours();
    const minutes = pad(d.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${datePart} ${pad(hours)}:${minutes} ${ampm}`;
};

// GET /api/v1/applications
// Returns the list of applications for the Applicants table (id, date, name, status).
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });

        const formatted = applications.map((app) => ({
            id: app._id,
            date: formatDateTime(app.createdAt),
            name: app.applicantName,
            status: app.status
        }));

        res.status(200).json({ applications: formatted });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// GET /api/v1/applications/stats
// Returns counts for the Dashboard's stat cards.
const getApplicationStats = async (req, res) => {
    try {
        const [pending, approved, rejected, total] = await Promise.all([
            Application.countDocuments({ status: "Pending" }),
            Application.countDocuments({ status: "Approved" }),
            Application.countDocuments({ status: "Rejected" }),
            Application.countDocuments({})
        ]);

        res.status(200).json({
            pending,
            approved,
            resubmit: rejected, // "Resubmit" card maps to Rejected applications
            total
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// PATCH /api/v1/applications/:id/status
// Body: { status: "Approved" | "Rejected" | "Pending" }
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Only log actual approve/reject decisions, not a reset back to Pending
        if (status === "Approved" || status === "Rejected") {
            await AuditLog.create({
                action: status,
                applicantName: application.applicantName,
                applicationId: application._id
            });
        }

        res.status(200).json({
            message: "Application status updated",
            application: {
                id: application._id,
                date: formatDateTime(application.createdAt),
                name: application.applicantName,
                status: application.status
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export {
    getAllApplications,
    getApplicationStats,
    updateApplicationStatus
};
