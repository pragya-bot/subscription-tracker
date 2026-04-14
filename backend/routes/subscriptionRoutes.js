const express = require('express');
const router = express.Router();
const subscription = require('../models/sub.js');
const User= require('../models/user.js');

//fn to check if user is authenticated
function isLoggedIn(req,res,next){
    if(req.session.user_id){
        console.log("logged in session id :", req.session.user_id);
        return next();
    }
    return res.redirect("/auth/login");
}

router.post("/newSubscription", isLoggedIn, async(req,res)=>{
    try{
        const userId = req.session.user_id;
        console.log("new subscription user id :", userId);
        const newSub= new subscription({...req.body, user: userId});
        await newSub.save();
        res.redirect("/sub");
    } catch(err){
        console.log("Error during creating new subscription:", err);

    }
})   

router.get("/new",isLoggedIn,(req,res)=>{
    try{
    res.render("newSub");
    }
    catch(err){
        console.log("Error during rendering new subscription page:", err);
    }
})



router.get("/", isLoggedIn, async(req,res)=>{
    try{
        const userId = req.session.user_id;
        const userData= await User.findById(userId);
        const subs= await subscription.find({user: userId});
        // const subs= await subscription.find({user: userId});
        res.render("dashboard",{user: userData, subs});
    }
    catch(err){
        console.log("Error during feting subscriptions from db:", err);
    }
}
)


module.exports = router;