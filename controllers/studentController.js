import express from "express";
import Student from "../models/studentModel.js";
import mongoose from "mongoose";
const router = express.Router();


// Fetch All Data
//  GET: localhost:3000/students
router.get('/', async (req, res) => {

    try {
        const students = await Student.find();
        res.send({ message: "Students Fetched Successfully!", students: students });

    } catch (error) {
        res.send({ message: error.message });
    }
});


// Register
//  POST: localhost:3000/students/register
router.post('/register', async (req, res) => {

    try {
        const student = await Student.create(req.body);
        res.status(200).send({ message: "Stdent Added Succesfully!", student: student });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// Login 
//  PUT: localhost:3000/students/login
router.get('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        // Check Email Exist or Not
        if (!student)
            return res.status(404).send({ message: 'Email not found!' })


        const isCorrectPassword = student.comparePassword(password);

        if (!isCorrectPassword)
            return res.status(400).send({ message: 'Password is incorrect!' })


        res.status(200).send({ message: "Logged In Succesfully!", student: student });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// Edit
//  PUT: localhost:3000/students/:id
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const student = await Student.findOneAndUpdate({ _id: id }, { ...req.body });


    // Checking ID is Valid or Not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Student ID!" });

    // Error if data not found 
    if (!student)
        return res.status(404).send({ message: "No Student Data Found!" });

    // Data updated
    res.status(200).send({ mess: "Student Data Updated!" });

});


// Delete
//  DELETE: localhost:3000/students/:id
router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const student = await Student.findOneAndDelete({ _id: id });

    // Checking  ID valid or not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Student ID!" });

    // Error if data not found 
    if (!student)
        return res.status(404).send({ message: "No Student Data Found!" });

    // Data deleted
    res.status(200).send({ message: "Student Data Deleted!" })
})




export default router