import express from "express";


// Custom import
import { addStudent, deleteStudent, getAllStudent, getJuniorStudents, getStudent, updateStudent } from "../controllers/studentController.js";
import { validateClassCategory } from "../middleware/classCategory.js";


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
router.route('/:category/:classId')
        .get(validateClassCategory, getJuniorStudents)



export default router