import express, { Router } from "express";
import cors from 'cors';
import mongoDB from './config/mongoDB.mjs';
import router from './routes/router.mjs'
const app = express();


// MiddleWare
app.use(cors())
app.use(express.json())


// Database Connection
mongoDB.connection
    .once('open', () => {
        app.listen(3001);
        console.log("Database Connected");
    })
    .on("error", (err) => {
        console.log("Error Connecting DB -->", err)
    })


app.use('/', router)


