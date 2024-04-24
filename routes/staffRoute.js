import express from "express";

// Custom imports
import { getAllStaffs, getCurrentUser } from "../controllers/staffController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/')
    .get(authorize('admin'), getAllStaffs)
    router.route('/current-user')
    .get(getCurrentUser)

export default router;