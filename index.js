const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');


const path = require('path');
require('dotenv').config()
const dbConnect = require('./Config/db');
dbConnect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routes
const authroutes = require('./routes/auth');
const { urlencoded } = require('body-parser');
app.use(authroutes);
//cors
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:5173',
}
app.use(cors(corsOptions));





//Views

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`server started at ${port}`);
})