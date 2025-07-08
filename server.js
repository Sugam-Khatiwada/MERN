// const express = require('express');
import express from 'express';
import connectDB from './config/database.js';
import userRouter from './routes/user.route.js';
import employeeRouter from './routes/employee.route.js';
import authRouter from './routes/auth.route.js';
import { profileMiddleWare } from './middleware/middleware.js';
import { verifyUser } from './middleware/verify.token.js';


const app = express();
const PORT = 3000;

app.use(express.json());






app.get('/', (req, res) => {
  res.send('I am your 1st response');
})

app.get('/about', (req, res) => {
  res.send('I am from about response');
})

app.use('/api', userRouter);
app.use('/api', employeeRouter);
app.use('/api', authRouter);


// creating the protected route
app.get('/profile',profileMiddleWare, (req, res) => {
  res.send('I am from profile page');
})


app.get('/check',verifyUser, (req, res) => {
  res.status(200).json({
    message: "Yesssssssssss, I am an Employee"})
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
