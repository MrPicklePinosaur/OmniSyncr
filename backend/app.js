const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
require('dotenv/config');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});







//API
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
app.listen(3000);

