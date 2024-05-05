import express from "express";
import { getCurrentUser } from "../controllers/staffController.js";

const router = express.Router()

router.route('/')
    .get(getCurrentUser)


export default router;