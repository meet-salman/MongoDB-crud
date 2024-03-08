import mongoose from "mongoose";
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

const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;