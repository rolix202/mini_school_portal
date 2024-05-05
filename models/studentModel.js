import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please enter student name']
    },
    class: {
        type: String,
        required: [true, 'Choose student class'],
        enum: ['JSS_1 Platinum', 'JSS_2 Galaxy', 'JSS_3', 'SS_1 Platinum', 'SS_2 Galaxy', 'SS_3']
    },

    subjectArea: {
        type: String,
        required: [true, 'Select student subject Area'],
        enum: ['Sciences', 'Arts']
    },
    
    assignedSubjects: {
        type: [{
            type: String
        }],
        validate: {
            validator: function(val){
                return val.length > 4
            },
            message: "Please assign at least five subject and above"
        }
    }
})


const Student = mongoose.model('Student', studentSchema)

export default Student