import { Router } from "express";
import { getAuditLogs } from "../controllers/auditLog.controller.js";

const router = Router();

router.route("/").get(getAuditLogs);

export default router;
