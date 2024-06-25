require('dotenv').config();
const express = require('express');

const connectDB = require('../mongodb/db');
const userRouter = require('./management/user');
const productRouter = require('./management/product');

const app = express();

const port = process.env.PORT || 3000;

connectDB(); 

app.use('/user', userRouter);
app.use('/product', productRouter);


app.get("/", (req, res) => res.status(200).json({status: true, message: "Hello World"}));
app.listen(port, () => console.log(`App Listening At PORT ${port}`));``