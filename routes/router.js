import express from "express";
const router = express.Router();
import students from '../controllers/studentController.js'


router.use('/api/v1/students', students)


export default router;