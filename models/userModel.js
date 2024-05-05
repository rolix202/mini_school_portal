import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter your full name']
    },
    phoneNo: {
        type: String,
        minlength: [11, 'Phone number must be at least 11 characters long'],
        required: [true, 'Please enter your phone number']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    subject: {
        type: String,
        enum: ['English', 'Mathematics', 'Biology', 'Civic Education', 'Data Processing', 'Government', 'C.R.K', 'Economics', 'Commerce'],
    },
    staffClass: {
        type: String,
        enum: ['JSS_1 Platinum', 'JSS_1 Rose', 'JSS_1 Galaxy', 'JSS_2 Rose', 'JSS_2 Galaxy', 'JSS_3 Rose', 'JSS_3 Galaxy', 'SS_1 Platinum', 'SS_1 Galaxy', 'SS_2 Galaxy', 'SS_2 Platinum', 'SS_3 Galaxy', 'SS_3 Platinum']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    confirmPass: {
        type: String,
        required: [true, 'Please Confirm your password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(val){
                return val === this.password;
            },
            message: "Password and Comfirm password do not match!"
        }
    },
    role: {
        type: String,
        enum: ['admin', 'subject_teacher', 'class_teacher'],
        default: 'subject_teacher'
    },
    passwordChangedAt: Date,
});

staffSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    this.confirmPass = undefined;

    next()
})

staffSchema.methods.comparePasswordInDb = async function(pass, passInDb){
    return await bcrypt.compare(pass, passInDb)
}

staffSchema.methods.isPasswordChangedAt = async function(jwtTimeStamp){
    if (this.passwordChangedAt){
        const passwordChangedTimeStamp = parseInt(this.passwordChangedAt.getTime() * 1000 / 10);

        return jwtTimeStamp < passwordChangedTimeStamp;
    }
    return false
}



const Staff = mongoose.model('Staff', staffSchema);

export default Staff;