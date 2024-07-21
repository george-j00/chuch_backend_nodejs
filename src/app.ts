import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { start } from 'simple-auth-connection';
import userRouter from './routes/user.routes';
import adminRouter from './routes/admin.routes';



dotenv.config();
const app : Express = express();
const port = process.env.PORT;

start(process.env.MONGODB_URI!)

// app.use(cors({
//   origin: 'https://church-production-nextjs.vercel.app', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors());
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(adminRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});     