const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get("/register", (req, res) => {
    res.render("register");
})
router.post("/register", async (req, res) => {
    let newUser = new User(req.body);
    try {
        await newUser.save();
        res.redirect("/login");
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
        const user = await User.findOne({ username, password });
        if(!user){
            return res.send("User not found");
        }
        res.send("found");
    }
    catch(err){
        console.error("Error logging in:", err);
    }
})

module.exports = router;