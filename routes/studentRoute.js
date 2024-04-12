import express from "express";


// Custom import
import { addStudent, getAllStudent } from "../controllers/studentController.js";


const router = express.Router() 

router.route('/')
        .post(addStudent)
        .get(getAllStudent)


export default router