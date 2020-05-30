const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Room = require('../models/Room');

router.get("/create",async (req,res)=>{
    const room = new Room(
        {
            code:"AEHUY",
            ws:"ahgh"
        }
    );
    const savedRoom = await room.save().then(data =>{
        res.json(data);
    }).catch(err =>{
        res.json({message:err});
    });

});
router.post("/join",(req,res)=>{
    console.log(req.body);
    const r = Room.findOne({'code':req.body.code});
    r.exec(function (err, room) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host."
        res.json(room);
    });

});
module.exports = router;