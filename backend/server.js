const express = require("express");
const app = express();
const mongoose= require("mongoose");
const cors = require("cors");
const port = 5000;
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "./views"));

db();
app.use("/", authRoutes);

app.get("/", (req,res)=>{
    res.send("Shubh Arambh of Subscription Tracker :)")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})