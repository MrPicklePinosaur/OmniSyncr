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
            ws:"ahgh",
            owner:req.body.name,
            members:{}

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
    r.update({$push:{members:req.body.name}})

    r.exec(function (err, room) {
        if (err) return handleError(err);
        res.json(room);
    });
});
router.post("/ready",async (req,res)=>{
    const r = Room.findOne({code:req.body.code});
    if(req.body.name===r.owner){
        r.ready = true;
        //make firebase room
    }
    res.json({r.ready})

})
router.post("/getRoom")


module.exports = router;