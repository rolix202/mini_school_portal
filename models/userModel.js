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
    class: {
        type: String,
        enum: ['JSS_1', 'JSS_2', 'JSS_3', 'SS_1', 'SS_2', 'SS_3'],
        default: 'JSS_1'
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
        enum: ['user', 'admin'],
        default: 'user'
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