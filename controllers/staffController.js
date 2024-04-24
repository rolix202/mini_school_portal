import Staff from "../models/userModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";



export const getAllStaffs = asyncErrorHandler(async (req, res, next) => {
    const staff = await Staff.find();

    // if (staff.length === 0) {
    //     const error = new CustomError('No record found!', 404)
    //     return next(error)
    // }

    res.status(200).json({
        status: 'success',
        length: staff.length,
        data: {
            staff
        }
    })
}) 

export const getCurrentUser = asyncErrorHandler(async (req, res, next) => {
    const { staffId } = req.staff;

    const currentUser = await Staff.findOne({ _id: staffId });

    console.log("your class is: ", currentUser.class);
    res.status(200).json({
        status: 'success',
        data: {
            currentUser
        }
    });
});
