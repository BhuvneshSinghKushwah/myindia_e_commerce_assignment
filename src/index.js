require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => res.status(200).json({status: true, message: "Hello World"}))
app.listen(port, () => console.log(`App Listening At PORT ${port}`));