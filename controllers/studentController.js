import Student from "../models/studentModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/customError.js"

export const addStudent = asyncErrorHandler(async (req, res, next) => {
    const student = await Student.create(req.body)

    if(!student){
        const error = new CustomError("Could not create student", 400);
        return next(error)
    }

    res.status(201).json({
        status: 'success',
        message: 'Student created successfully',
        data: {
            student
        }
    })
}) 

export const getAllStudent = asyncErrorHandler(async (req, res, next) => {

    const { assignedClass } = req.staff

    const students = await Student.find({staffClass: assignedClass})

    // if (students.length === 0){
    //     const error = new CustomError("No student found", 404)
    //     return next(error)
    // }

    res.status(200).json({
        status: 'success',
        data: {
            students
        }   
    })
}) 

export const getStudent = asyncErrorHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id)
    
    if(!student){
        const error = new CustomError("Student with the ID is not found", 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    })
    
}) 

export const updateStudent = asyncErrorHandler(async (req, res, next) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!updatedStudent){
        const error = new CustomError("Student with the ID not found", 404)
        return next(error)
    }
    
    res.status(200).json({
        status: "success",
        data: {
            updatedStudent
        }
    })
}) 

export const deleteStudent = asyncErrorHandler(async (req, res, next) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)

    if(!deletedStudent){
        const error = new CustomError("Student with the ID not found", 404)
        return next(error)
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
}) 