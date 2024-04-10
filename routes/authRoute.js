import express from "express";

// Custom imports
import { login, signup } from "../controllers/authController.js";


const router = express.Router();

router.route('/signup')
    .post(signup)
router.route('/login')
    .post(login)

    
export default router;