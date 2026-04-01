const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
        minLength:6,
        unique : true
    }
})

const User = mongoose.model("User" , userSchema);
module.exports = User;