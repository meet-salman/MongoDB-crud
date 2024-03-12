import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;


const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, " Email is required!"],
        unique: [true, "Email Already in Use!"]
    },
    contactNo: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        default: [],
        type: []
    }
});


// Password Bycryption
studentSchema.pre('save', function (next) {
    const student = this;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(student.password, salt);

    student.password = hash;
    next();
});


// Password Compare
studentSchema.methods.comparePassword = function (password) {
    const student = this;

    return bcrypt.compareSync(password, student.password);
};



const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;