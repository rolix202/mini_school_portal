import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please enter student name']
    },
    class: {
        type: String,
        enum: ['JSS_1', 'JSS_2', 'JSS_3', 'SS_1', 'SS_2', 'SS_3'],
        default: 'JSS_1'
    },
    
    assignedSubjects: [{
        type: String,
    }]
})

const Student = mongoose.model('Student', studentSchema)

export default Student