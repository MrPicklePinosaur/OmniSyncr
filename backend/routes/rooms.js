const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Room = require('../models/Room');
const firebase =  require('firebase');

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.get('/',(req,res) =>{
    res.send("We are on rooms");
});
router.get("/create",(req,res)=>{
    const room = new Room(
        {
            code:makeId(6),
            dbCode:"ahgh",
            owner:req.body.name,
            ready:false

        }
    );
    const savedRoom = room.save().then(data =>{
        res.json(data);
    }).catch(err =>{
        res.json({message:err});
    });
    var config = {
        databaseURL: "https://masseyhacks6.firebaseio.com",
        projectId: "masseyhacks6"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    db.collection("Rooms").doc("Any ID").set({
        LastUpdate: new Date().getTime(),
        Members: [
        ],
        PartyLeader: req.body.name,
        Status: "Paused",
        Watched: 0,
        Connected: 0,
    });


});
router.post("/join",(req,res)=>{
    console.log(req.body);
    const r = Room.findOne({code:req.body.code});

    r.exec(function (err, room) {
        if (err) return handleError(err);
        res.json(room);
    });
});

module.exports = router;