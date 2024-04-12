import jwt from "jsonwebtoken";

// Custom imports
import Staff from "../models/userModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/customError.js";

const jwtSignToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXP
    })
}

// const options = {
//     maxAge: process.env.JWT_SECRET_EXP,
//     httpOnly: true,
// }

export const signup = asyncErrorHandler(async (req, res, next) => {

    const staff = await Staff.create(req.body)

    staff.password = undefined;

    const token = jwtSignToken(staff._id);

    // if (process.env.NODE_ENV === 'production'){
    //     options.secure = true
    // }

    // res.cookie('jwt', token, options)


    const options = {
        maxAge: process.env.JWT_SECRET_EXP,
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res.cookie('jwt', token, options);


    res.status(201).json({
        status: 'success',
        length: staff.length,
        message: 'Staff created successfully',
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

    const token = jwtSignToken(staff._id);

    const options = {
        maxAge: process.env.JWT_SECRET_EXP,
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res.cookie('jwt', token, options);

    staff.password = undefined;

    res.status(200).json({
        status: 'success',
        message: 'Logged in Successfully..!',
        data: {
            staff
        }
    })
   
}) 

export const protect = asyncErrorHandler(async (req, res, next) => {
    let reqToken = req.headers.authorization;

    let token;

    if (reqToken && reqToken.startsWith("Bearer")){
        token = reqToken.split(' ')[1];
    }

    if(!token){
        const error = new CustomError('You are not logged In!', 401);

        return next(error)
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const staff = await Staff.findById(decodedToken.id)

    if(!staff){
        const error = new CustomError('Staff with given token does not exist', 401)
        return next(error)
    }

    const isPasswordChanged = await staff.isPasswordChangedAt(decodedToken.iat)

    if(isPasswordChanged){
        const error = new CustomError("Password has been changed recently! Please log in again", 401)
        return next(error)
    }

    req.staff = staff;
    next()
}) 
