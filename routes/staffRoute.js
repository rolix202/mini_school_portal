import express from "express";

// Custom imports
import { deleteStaff, getAllStaffs, getStaff, updateStaff } from "../controllers/staffController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/')
    .get(authorize('admin'), getAllStaffs)

router.route('/:id')
    .get(getStaff)
    .patch(authorize('admin'), updateStaff)
    .delete(authorize('admin'), deleteStaff)    


export default router;