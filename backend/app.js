const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http');
require('dotenv/config');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//WebSocket
const port = 3000;

//API
const roomRoutes = require('./routes/rooms');
//Routes
app.use('/rooms',roomRoutes);
app.get('/',(req,res) =>{
    res.send("We are on home");
});


mongoose.connect(process.env.DB_CONNECTION,    { useNewUrlParser: true },
    () => {
    console.log("connected to db");
},
);
app.listen(port);

