const express = require("express");
const app = express();
const mongoose= require("mongoose");
const cors = require("cors");
const port = 5000;
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const subRoutes = require("./routes/subscriptionRoutes");
const path = require('path');
// requiring session to maintain an individual data buckets for each user to hold their data
const session = require('express-session');


// middleware tells the app to expect a session cookie and to use the session middleware to manage sessions
// add middleware to use sessions
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// cors middleware to allow cross-origin requests from the frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "./views"));

db();
app.use("/auth", authRoutes);
app.use("/sub", subRoutes);

app.get("/", (req,res)=>{
    res.send("Shubh Arambh of Subscription Tracker :)")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})