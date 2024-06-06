import express from "express";


// Custom import
import { addStudent, deleteStudent, getAllStudent, getJuniorStudents, getStudent, updateStudent } from "../controllers/studentController.js";
import { validateClassCategory } from "../middleware/classCategory.js";
import { getAssessment, createAssessment, updateAssessment, getAssessmentsByClassTermCategory } from "../controllers/assessmentController.js";


const router = express.Router() 

router.route('/')
        .post(addStudent)
        .get(getAllStudent)

router.route('/assessment')
        .get(getAssessmentsByClassTermCategory)

router.route('/:id')
        .get(getStudent)
        .patch(updateStudent)
        .delete(deleteStudent)

router.route('/assessment/:studentId')
        .post(createAssessment)
        .get(getAssessment)
        .patch(updateAssessment)

router.route('/:category/:classId')
        .get(validateClassCategory, getJuniorStudents)





export default router