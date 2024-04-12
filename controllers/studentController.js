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
    const student = await Student.find()

    if (student === 0){
        const error = new CustomError("No student found", 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        No_of_Students: student.length,
        data: {
            student
        }   
    })
}) 

export const getStudent = (req, res, next) => {

}

export const updateStudent = (req, res, next) => {

}

export const deleteStudent = (req, res, next) => {

}