const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    code:String,
    dbCode:Number,
    owner:String,
    members:[String]
});

module.exports = mongoose.model("Rooms",RoomSchema);
