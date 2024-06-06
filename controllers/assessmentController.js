import Assessment from "../models/assessmentModel.js";
import Student from "../models/studentModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";


// export const createAssessment = asyncErrorHandler(async (req, res, next) => {
//     const { studentId } = req.params;
//     const { term, category, scores } = req.body;

//     const existingAssessment = await Assessment.findOne({ student: studentId, term });

//     if (existingAssessment) {
//         const error = new CustomError("Assessment already exists for this student ...!", 400)

//         return next(error)
//     }

//     const assessment = new Assessment({
//         student: studentId,
//         term,
//         assessments: [{ category, scores }]
//     });

//     const savedAssessment = await assessment.save();

//     res.status(201).json({
//         message: 'Assessment submitted successfully',
//         length: savedAssessment.length,
//         data: {
//             savedAssessment
//         }
//     });
// });


export const createAssessment = asyncErrorHandler(async (req, res, next) => {
    const { studentId } = req.params;
    const { term, category, scores } = req.body;

    // Find the existing assessment for the student and term
    let existingAssessment = await Assessment.findOne({ student: studentId, term });

    if (existingAssessment) {
        // Check if the category already exists in the assessments array
        const categoryExists = existingAssessment.assessments.some(assessment => assessment.category === category);

        if (categoryExists) {
            const error = new CustomError("Assessment already exists for this category and student!", 400);
            return next(error);
        } else {
            // Add the new category and scores to the assessments array
            existingAssessment.assessments.push({ category, scores });
            const updatedAssessment = await existingAssessment.save();

            return res.status(201).json({
                message: 'Assessment updated successfully',
                length: updatedAssessment.length,
                data: {
                    updatedAssessment
                }
            });
        }
    } else {
        // Create a new assessment document if none exists for the student and term
        const assessment = new Assessment({
            student: studentId,
            term,
            assessments: [{ category, scores }]
        });

        const savedAssessment = await assessment.save();

        return res.status(201).json({
            message: 'Assessment submitted successfully',
            length: savedAssessment.length,
            data: {
                savedAssessment
            }
        });
    }
});


export const getAssessmentsByClassTermCategory = asyncErrorHandler(async (req, res, next) => {

    const { s_class, term, category } = req.query

    const pipeline = [
        {
            $lookup: {
                from: "students",
                localField: "student",
                foreignField: "_id",
                as: "studentDetails"
            }
        },
        {
            $unwind: "$studentDetails"
        },
        {
            $match: {
                "studentDetails.studentClass": s_class,
                "term": term,
                "assessments.category": category
            }
        },
        {
            $project: {
                "studentName": "$studentDetails.name",
                "studentClass": "$studentDetails.studentClass",
                "term": 1,
                "assessments": 1
            }
        }
    ]

    const assessment = await Assessment.aggregate(pipeline)

    if (assessment.length === 0) {
        const error = new CustomError("No record found", 404)
        return next(error)
    }

    res.status(200).json({
        status: "success",
        length: assessment.length,
        data: {
            assessment
        }
    })

})



export const getAssessment = asyncErrorHandler(async (req, res, next) => {

    const student = await Student.findById(req.params.studentId)

    if (!student) {
        const error = new CustomError("Student with given ID not found", 404)
        return next(error)
    }


    const assessments = await Assessment.find({ student: req.params.studentId }).populate('student');

    res.status(200).json({
        status: 'success',
        data: {
            assessments
        }
    });

});

export const updateAssessment = asyncErrorHandler(async (req, res, next) => {
    
})