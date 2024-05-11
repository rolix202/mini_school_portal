import Student from "../models/studentModel.js";
import { STUDENT_CLASS } from "../utils/constants.js";
import CustomError from "../utils/customError.js";

export const validateClassCategory = async (req, res, next) => {
    
   const { category, classId } = req.params;

   const isValidClassId = Object.values(STUDENT_CLASS).includes(classId)
   
   if (!isValidClassId){
      const error = new CustomError("class Id does not exist", 400)
      return next(error)
   }

   if ((category !== "jss") && (category !== "sss")){
    const error = new CustomError("Category does not exist", 400)
    return next(error)
   }

   const isJuniorClass = classId.startsWith("J")
   const isSeniorClass = classId.startsWith("S")

   if ((category === "jss" && isSeniorClass) || category === "sss" && isJuniorClass){
    const error = new CustomError("Invalid category for the specified class", 400)
    return next(error)
   }

   next()
   
}
