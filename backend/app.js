const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRoutes = require('./routes/login');
const roomRoutes = require('./routes/rooms');
//Routes
app.use('/login',loginRoutes);
app.use('/rooms',roomRoutes);
app.get('/',(req,res) =>{
    res.send("We are on home");
});

mongoose.connect(process.env.DB_CONNECTION,    { useNewUrlParser: true },
    () => {
    console.log("connected to db");
},

);
app.listen(3000)