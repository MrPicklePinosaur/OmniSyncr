const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Room = require('../models/Room');

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
router.get("/create",async (req,res)=>{
    const room = new Room(
        {
            code:makeId(6),
            dbCode:"ahgh",
            owner:req.body.name,
            ready:false

        }
    );
    const savedRoom = await room.save().then(data =>{
        res.json(data);
    }).catch(err =>{
        res.json({message:err});
    });

});
router.post("/join",async (req,res)=>{
    console.log(req.body);
    const r = Room.findOne({code:req.body.code});

    r.exec(function (err, room) {
        if (err) return handleError(err);
        res.json(room);
    });
});

router.post("/getRoom")


module.exports = router;