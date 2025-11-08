import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/connectDB.js"
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";


dotenv.config({ path: './.env' });


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send('Hello, World!');
});


import chatRoute from './routes/chatRoute.js'

app.use('/api/v1/send', chatRoute)



connectDB().then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection error:', err);
});


app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Internal Server Error",
    });
});

