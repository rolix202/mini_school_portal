import jwt from "jsonwebtoken";

// Custom imports
import Staff from "../models/userModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/customError.js";
import { createJWT } from "../utils/tokenUtil.js";


const oneDay = 1000 * 60*60*24;

const options = {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
}

export const signup = asyncErrorHandler(async (req, res, next) => {

    const staff = await Staff.create(req.body)

    staff.password = undefined;

    const token = createJWT({staffId: staff._id, role: staff.role, assignedClass: staff.staffClass, subject: staff.subject})

    res.cookie('token', token, options)

    res.status(201).json({
        status: 'success',
        message: 'Successfully registered'
    })

}) 

export const login = asyncErrorHandler(async (req, res,next) => {
    const {email, password} = req.body
    
    if(!email || !password){
        const error = new CustomError('Please provide a valid email and password', 400)
        return next(error)
    }

    const staff = await Staff.findOne({ email }).select('+password');
   
    
    if(!staff || !(await staff.comparePasswordInDb(password, staff.password))){
        const error = new CustomError('Invalid email or password..!', 400)
        return next(error)
    }

    const token = createJWT({staffId: staff._id, role: staff.role, assignedClass: staff.staffClass, subject: staff.subject})

    res.cookie('token', token, options)

    staff.password = undefined;

    res.status(200).json({
        status: 'success',
        message: 'Log in Successful',
        token
    })
   
}) 


export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now()),
    });
    res.status(200).json({
        status: 'success',
        message: 'Logged Out Successfully'
    })
}