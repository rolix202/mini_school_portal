import Staff from "../models/userModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";



export const getAllStaffs = asyncErrorHandler(async (req, res, next) => {
    const staffs = await Staff.find();

    // if (staff.length === 0) {
    //     const error = new CustomError('No record found!', 404)
    //     return next(error)
    // }

    res.status(200).json({
        status: 'success',
        data: {
            staffs
        }
    })
}) 

export const getStaff = asyncErrorHandler(async (req, res, next) => {

    const staff = await Staff.findById(req.params.id)

    if(!staff){
        const error = new CustomError("Staff with ID not found", 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        data: {
            staff
        }
    })
}) 

export const updateStaff = asyncErrorHandler(async (req, res, next) => {


    if(req.body.role === "subject_teacher"){
        req.body.staffClass= null
    }
    
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} )

    if (!updatedStaff){
        const error = new CustomError("Staff with ID not found!", 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedStaff
        }
    })
}) 


export const deleteStaff = asyncErrorHandler(async (req, res, next) => {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id)

    if (!deletedStaff){
        const error = new CustomError("Staff with ID not found!", 404)
        return next(error)
    }

    res.status(200).json({
        status: 'success',
        data: null
    })
} )


export const getCurrentUser = asyncErrorHandler(async (req, res, next) => {
    const { staffId } = req.staff;

    const currentUser = await Staff.findOne({ _id: staffId });

    // console.log("your class is: ", currentUser.class);
    res.status(200).json({
        status: 'success',
        data: {
            currentUser
        }
    });
});
