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
 
    const { subject, assignedClass } = req.staff

    // if (!subject || !assignedClass){
    //     const error = new CustomError("Please provide both subject and studentClass", 400)
    //     return next(error)
    // }

    const students = await Student.find({
        assignedSubjects: subject,
        studentClass: assignedClass
    })

    const filteredStudent = students.map((student) => ({
       name: student.name,
       studentID: student._id,
       subjectArea: student.subjectArea,
       subject: student.assignedSubjects.filter((sub) => sub == subject)

    }))

    res.status(200).json({
        status: 'success',
        length: filteredStudent.length,
        data: {
            filteredStudent
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


export const getJuniorStudents = asyncErrorHandler(async (req, res, next) => {
    
    const students = await Student.find({studentClass: req.params.classId})

    res.status(200).json({
        status: 'success',
        data: {
            students
        }
    })

})