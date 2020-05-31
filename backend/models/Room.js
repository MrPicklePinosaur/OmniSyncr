const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    code:String,
    dbCode:String,
    owner:String,

    members:[String]
]
});

module.exports = mongoose.model("Users",RoomSchema);
