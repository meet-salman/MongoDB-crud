import express from "express";
const router = express.Router();
import students from '../controllers/studentController.mjs'


router.use('/students', students)


export default router;