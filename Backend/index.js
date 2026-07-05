import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongoose.config.js';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

// initialization
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin:["http://localhost:5121"],
    credentials: true
}
app.use(cors(corsOptions));

// api's
app.get("/",  (req, res) => res.end("hello from server!"));
app.use('/api/auth', authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});