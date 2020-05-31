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
router.post("/create",async (req,res)=>{
    const code = makeId(6);
    const id=Math.floor(Math.random()*1000000);
    const room = new Room(
        {
            code:code,
            dbCode:id,
            owner:req.body.name,
            ready:false,
            members:[req.body.name]

        }
    );
    const savedRoom = room.save().then(data =>{
        res.json(data);
    }).catch(err =>{
        res.json({message:err});
    });
    console.log(req.body.name);
    var config = {
        databaseURL: "https://masseyhacks6.firebaseio.com",
        projectId: "masseyhacks6"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var db = firebase.firestore();

    console.log(id);
    db.collection("Rooms").doc(id.toString()).set({
        LastUpdate: new Date().getTime(),
        PartyLeader: req.body.name,
        Status: "Paused",
        Watched: 0,
        ID: id
    });



});
router.post("/getRoom",async (req,res)=>{
    const r = Room.findOne({code:req.body.code});
    r.exec(function (err, room) {
        if (err) return res.json({});
        res.json(room);
    });



});
router.post("/join",async (req,res)=>{
    console.log(req.body);
    Room.findOneAndUpdate(
        { code: req.body.code },
        { $push: { members: req.body.name }, upsert:false },
    );
    const r = Room.findOne({code:req.body.code});

    r.exec(function (err, room) {
        if (err) return res.json({});
        res.json(room);
    });
});

module.exports = router;