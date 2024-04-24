import express from "express";

// Custom imports
import { login, logout, signup } from "../controllers/authController.js";


const router = express.Router();

router.route('/signup')
    .post(signup)
router.route('/login')
    .post(login)
router.route('/logout')
    .get(logout)

    
export default router;