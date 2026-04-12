const express = require('express');
const router = express.Router();
const subscription = require('../models/sub.js');

//fn to chec if user is authenticated
function isLoggedIn(req,res,next){
    if(req.session.user_id){
        return next();
    }
    return res.redirect("/auth/login");
}

router.post("/newSubscription", isLoggedIn, async(req,res)=>{
    try{
        const userId = req.session.user_id;
        const newSub= new subscription({...req.body, user: userId});
        await newSub.save();
        res.redirect("/sub");
    } catch(err){
        console.log("Error during creating new subscription:", err);

    }
})   
// new subscription ejs to be made
router.get("/new",isLoggedIn,(req,res)=>{
    try{
    res.render("newSub");
    }
    catch(err){
        console.log("Error during rendering new subscription page:", err);
    }
})


// Subscription ejs to be made
router.get("/", isLoggedIn, async(req,res)=>{
    try{
        const userId = req.session.user_id;
        const subs= await subscription.find({user: userId});
        res.render("show",{subs});
    }
    catch(err){
        console.log("Error during feting subscriptions from db:", err);
    }
}
)


module.exports = router;