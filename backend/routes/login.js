const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
require('dotenv/config');
router.get("/",(req,res)=>{
    res.send("we are on login");
});
module.exports = router;
