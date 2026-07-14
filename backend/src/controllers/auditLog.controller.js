import { AuditLog } from "../models/auditLog.model.js";

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

// GET /api/v1/audit-logs
// Returns the most recent audit log entries for the Dashboard's activity panel.
const getAuditLogs = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 20;

        const logs = await AuditLog.find()
            .sort({ createdAt: -1 })
            .limit(limit);

        const formatted = logs.map((log) => ({
            id: log._id,
            action: log.action,
            applicantName: log.applicantName,
            message: `${log.applicantName}'s application was ${log.action.toLowerCase()}`,
            date: formatDateTime(log.createdAt)
        }));

        res.status(200).json({ logs: formatted });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { getAuditLogs };
