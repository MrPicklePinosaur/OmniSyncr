const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    code:String,
    ws:String,
});
module.exports = mongoose.model("Users",RoomSchema);