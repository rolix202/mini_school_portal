import express from "express";


// Custom import
import { addStudent, deleteStudent, getAllStudent, getStudent, updateStudent } from "../controllers/studentController.js";


const router = express.Router() 

router.route('/')
        .post(addStudent)
        .get(getAllStudent)
router.route('/:id')
        .get(getStudent)
        .patch(updateStudent)
        .delete(deleteStudent)
router.route('/jss1-students')
        .get()
router.route('jss1-students/jss-galaxy')


export default router