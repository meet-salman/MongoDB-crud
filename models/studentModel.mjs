import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;


const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, " Email is required!"],
        unique: [true, "Email Already in Use!"]
    },
    password: {
        type: String,
        required: true
    },
});


// Password Bycryption
studentSchema.pre('save', function (next) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
});

const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;