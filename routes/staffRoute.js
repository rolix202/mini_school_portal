import express from "express";

// Custom imports
import { getAllStaffs } from "../controllers/staffController.js";

const router = express.Router()

router.route('/')
    .get(getAllStaffs)

export default router;