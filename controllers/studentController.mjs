import express from "express";
import Student from "../models/StudentModel.mjs";
import mongoose from "mongoose";
const router = express.Router();

//  GET: localhost:3000/students
router.get('/', async (req, res) => {

    try {
        const students = await Student.find();
        res.send({ message: "Students Fetched Successfully!", students: students });

    } catch (error) {
        res.send({ message: "Error Occured" });
    }
});


//  POST: localhost:3000/students/newstudent
router.post('/newstudent', async (req, res) => {

    try {
        const student = await Student.create(req.body);
        res.send({ message: "Stdent Added Succesfully!", student: student });
    } catch (error) {
        res.send({ message: "Error Occured" });
    }
});


//  PUT: localhost:3000/students/:id
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({ message: "Invalid Student ID!" })
        return
    }

    const student = await Student.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!student) {
        res.status(404).send({ message: "No Student Data Found!" })
        return
    }
    res.status(200).send({ mess: "Student Data Updated!" })

});






export default router