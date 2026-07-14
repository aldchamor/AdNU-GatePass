import { Router } from "express";
import {
    getAllApplications,
    getApplicationStats,
    updateApplicationStatus
} from "../controllers/application.controller.js";

const router = Router();

router.route("/").get(getAllApplications);
router.route("/stats").get(getApplicationStats);
router.route("/:id/status").patch(updateApplicationStatus);

export default router;
