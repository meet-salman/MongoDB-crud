const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { mongoose } = require('mongoose')
const { addStudent, getStudent, deleteStudent, updateStudent, getSingleStudent } = require('./controllers/studentController')
const port = process.env.PORT


// MiddleWare
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/students', getStudent)
app.get('/api/v1/students/:id', getSingleStudent)
app.post('/api/v1/students', addStudent)
app.put('/api/v1/students/:id', updateStudent)
app.delete('/api/v1/students/:id', deleteStudent)


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }
}
connectDB()
    .then(() => {
        app.listen(port)
    })
    .catch((err) => {
        console.log(err);
    })
