import express from "express";
const router = express.Router();
import students from '../controllers/studentController.js'


router.use('/students', students)


export default router;