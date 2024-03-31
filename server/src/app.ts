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


app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(adminRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});     