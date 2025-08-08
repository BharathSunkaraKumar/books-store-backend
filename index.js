import express, { response } from "express";
import { MONGO_URI, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
     res.status(200).send('hello')
})

app.use('/books', booksRouter)

mongoose
    .connect(MONGO_URI)
    .then(()=> {
        console.log('mogoose connected successfully')
        app.listen(PORT,() => {
            console.log(`server start at port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })