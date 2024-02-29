const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;


const studentSchma = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchma);