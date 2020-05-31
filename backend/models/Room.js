const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    code:String,
    dbCode:String,
    owner:String,
});

module.exports = mongoose.model("Rooms",RoomSchema);
