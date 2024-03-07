import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // profilePIC: {
    //     type: String,
    //     required: true
    // },
});

const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;