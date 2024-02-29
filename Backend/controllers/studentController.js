const { mongoose } = require('mongoose');
const Student = require('../models/studentModel');


// Get All Student
const getStudent = async (req, res) => {

    try {
        const students = await Student.find({});
        res.send({ student: students })
    } catch (error) {
        res.send({ message: 'Error Occured' })
    }
}

// Get Single Student
const getSingleStudent = async (req, res) => {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
        res.send({ message: "User Not Found" })
        return
    }
    res.send({ student: student })
}

// Add Student
const addStudent = async (req, res) => {

    const { name, email, age } = req.body;
    try {
        const student = await Student.create({ name, email, age });
        res.send({ message: 'Studet Added!', student: student })

    } catch (error) {
        res.send({ message: 'Error Occured' })
    }
}

// Update Student
const updateStudent = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.send({ message: "Not a Valid ID!" });
        return
    }

    const student = await Student.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!student) {
        res.send({ message: "No Student Found!" });
        return
    }
    res.send({ message: "Student Updated!", student: student });

}

// Delete Student
const deleteStudent = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.send({ message: "Not a Valid ID!" });
        return
    }

    const student = await Student.findOneAndDelete({ _id: id });
    if (!student) {
        res.send({ message: "No Student Found!" });
        return
    }
    res.send({ message: "Student Deleted!" });
}



module.exports = { getStudent, getSingleStudent, addStudent, updateStudent, deleteStudent }