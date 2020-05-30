const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    friends:[String],
    history: [String]

});
module.exports = mongoose.model("Users",UserSchema);