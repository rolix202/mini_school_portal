import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Staff from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { verifyJWT } from "../utils/tokenUtil.js";


export const authenticateStaff = asyncErrorHandler(async (req, res, next) => {
    
    const { token } = req.cookies;

    if (!token) {
        const error = new CustomError('Authentication Failed!', 401);

        next(error)
    }


    const decodedToken = verifyJWT(token)

    const staff = await Staff.findById(decodedToken.staffId)

    if (!staff) {
        const error = new CustomError('Staff does not exist', 401)
        return next(error)
    }

    const isPasswordChanged = await staff.isPasswordChangedAt(decodedToken.iat)

    if (isPasswordChanged) {
        const error = new CustomError("Password has been changed recently! Please log in again", 401)
        return next(error)
    }

    const { staffId, role, assignedClass, subject } = decodedToken

    req.staff = { staffId, role, assignedClass, subject }

    next();
}) 

export const authorize = (role) => {
   return (req, res, next) => {
    if(req.staff.role !== role){
        // console.log(req.staff.role);
        // console.log(role);
        const error = new CustomError("Not Authourized to view this route", 401)
        next(error)
    }
    next()
   }
}