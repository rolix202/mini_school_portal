import mongoose from "mongoose";
import { ASSESSMENT_CATEGORY } from "../utils/constants.js";
import CustomError from "../utils/customError.js";

const assessmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true  // Index on student for faster lookups
    },
    term: {
        type: String,
        index: true  // Index on term for faster lookups
    },
    assessments: [{
        category: {
            type: String,
            enum: Object.values(ASSESSMENT_CATEGORY),
            required: true,
            index: true  // Index on category for faster lookups
        },
        scores: [{
            subject: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                min: 0,
                max: 100
            }
        }]
    }]
});

// Creating a compound index to ensure unique student, term, and category
assessmentSchema.index({ student: 1, term: 1, 'assessments.category': 1 }, { unique: true });

assessmentSchema.pre("save", async function(next) {
    try {
        // Loop through each assessment in the assessments array
        for (let assessment of this.assessments) {
            // Build query to check if the category already exists for the given student and term
            const query = {
                student: this.student,
                term: this.term,
                'assessments.category': assessment.category
            };

            // Exclude current document if it's an update
            if (!this.isNew) {
                query._id = { $ne: this._id };
            }

            const categoryExist = await Assessment.findOne(query);

            if (categoryExist) {
                const error = new CustomError("Assessment Type already exists for this student", 400);
                return next(error);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
