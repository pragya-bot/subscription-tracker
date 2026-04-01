const mongoose = require("mongoose");
const URL= "mongodb://127.0.0.1:27017/subscription_tracker";

async function main(){
    try{
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = main;