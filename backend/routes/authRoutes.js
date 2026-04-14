const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get("/register", (req, res) => {
    res.render("register");
})
router.post("/auth/register", async (req, res) => {
    let newUser = new User(req.body);
    try {
        await newUser.save();
        res.redirect("/auth/login");
    }
    catch (err) {
        console.error("Error registering user:", err);
    }
})    

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", async(req,res)=>{
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if(!user){
            // console.log("User not found with username:", username);
            return res.send("Wrong username");
        }
        if(user.password !== password){
            // console.log("Password mismatch for user:", password);
            return res.send("Wrong password");   
        }
        
        req.session.user_id = user._id;

        // console.log("session id :", req.session.user_id);
        res.redirect("/sub");
    }
    catch(err){
        console.error("Error logging in:", err);
    }
})

module.exports = router;