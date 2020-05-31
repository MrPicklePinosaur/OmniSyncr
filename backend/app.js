const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws');
const http = require('http');
require('dotenv/config');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//WebSocket
const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});
wss.on('connection',function connection(ws){
    ws.on('message',function incoming(data){
        wss.clients.forEach(function each(client){
            if(client!=ws && client.readyState === WebSocket.OPEN);
        })
    })

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

