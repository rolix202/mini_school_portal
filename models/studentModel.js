import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
    studentID: String,
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter student name']
    },
    classType: {
        type: String,
        enum: ["junior secondary", "senior secondary"],
        required: [true, 'Select the students calss section']
    },
    studentClass: {
        type: String,
        required: [true, 'Choose student class'],
        enum: ['JSS_1 Platinum', 'JSS_1 Rose', 'JSS_1 Galaxy', 'JSS_2 Rose', 'JSS_2 Galaxy', 'JSS_3 Rose', 'JSS_3 Galaxy', 'SS_1 Platinum', 'SS_1 Galaxy', 'SS_2 Galaxy', 'SS_2 Platinum', 'SS_3 Galaxy', 'SS_3 Platinum']
    },

    subjectArea: {
        type: String,
        required: [true, 'Select student subject Area'],
        enum: ['Sciences', 'Arts', 'Junior Classes']
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
// Define a pre-save hook to generate the studentID
studentSchema.pre('save', async function(next) {
    try {
        const count = await Student.countDocuments({ studentClass: this.studentClass });
        const sequentialNumber = (count + 1).toString().padStart(2, '0'); // Ensure at least two digits with leading zeros
        const splitClassName = this.studentClass.split(" ");
        this.studentID = `${splitClassName[0].charAt(0)}${splitClassName[0].slice(splitClassName[0].length - 1)}-${sequentialNumber}${splitClassName[1].charAt(0)}`;
        next();
    } catch (error) {
        next(error);
    }
});



const Student = mongoose.model('Student', studentSchema)

export default Student