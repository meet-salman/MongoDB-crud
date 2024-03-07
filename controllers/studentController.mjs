import express from "express";
import Student from "../models/StudentModel.mjs";
const router = express.Router();

//  GET: localhost:3000/students
router.get('/', async (req, res) => {

    try {
        const students = await Student.find();
        res.send({ message: "Students Fetched Successfully!", students: students })

    } catch (error) {
        res.send({ message: "Error Occured" })
    }
})


//  POST: localhost:3000/students/newstudent
router.post('/newstudent', async (req, res) => {

    try {
        const student = await Student.create(req.body);
        res.send({ message: "Stdent Added Succesfully!", student: student })
    } catch (error) {
        res.send({ message: "Error Occured" })
    }
})





export default router