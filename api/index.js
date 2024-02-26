import express, { json } from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import {authRouter} from "./routes/auth.js"
import { userRouter } from './routes/users.js';
import { postRouter } from './routes/posts.js';
import { catRouter } from './routes/categories.js';
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


const app = express();
// console.log(__filename);
// console.log(__dirname)
// app.use("http://localhost:8000/images" , express.static("http://localhost:8000/images"))


const PORT = 8000;

const DB_URL = process.env.DB_URL;

// const storage = multer.diskStorage({
//     destination : (req , file , cb) => {
//         return cb(null , "http://localhost:8000/images")
//     },
//     filename : (req , file , cb) => {
//         return cb(null , req.body.name)
//     }
// })

// const upload = multer({storage : storage})

app.post("http://localhost:8000/api/upload"  ,(req , res) => {
    res.status(200).json("file has been uploaded successfully")
    console.log(req.body);
    console.log(req.file);
})

mongoose.connect(DB_URL , {
    useNewUrlParser : true,
    // useUnifiedTopology : true,
    // useCreateIndex : true,
    // useFindAndModify : true
    
}).then(()=>{
    console.log("connected to db")
});

app.use(cors());
// app.use(bodyParser.json())
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.text({ limit: '200mb' }));
app.use("/api/auth" , authRouter);
app.use("/api/users" , userRouter)
app.use("/api/posts" , postRouter)
app.use("/api/categories" , catRouter);
app.listen(PORT , () => {console.log(`server running successfully on port ${PORT}` + " " + __dirname + " " + __filename)})

