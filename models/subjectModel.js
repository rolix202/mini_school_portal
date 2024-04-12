import mongoose from "mongoose";


// Subject Schema
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Input subject name']
    },
    teacher: {
        type: String,
        required: [true, 'Teachers name required']
    }
    
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject