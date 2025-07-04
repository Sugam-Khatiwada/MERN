// const express = require('express');
import express from 'express';
import connectDB from './config/database.js';
import userRouter from './routes/user.route.js';
import employeeRouter from './routes/employee.route.js';

const app = express();
const PORT = 3000;







app.get('/', (req, res) => {
  res.send('I am your 1st response');
})

app.get('/about', (req, res) => {
  res.send('I am from about response');
})

app.use(express.json());
app.use('/api', userRouter);


app.use('/api', employeeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
