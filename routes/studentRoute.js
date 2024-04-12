import express from "express";


// Custom import
import { addStudent } from "../controllers/addStudent.js";


const router = express.Router() 

router.route('/').post(addStudent)


export default router