const mongoose=require('mongoose');
require('dotenv').config()
const db=process.env.db;
mongoose.connect(db)
.then((result)=>{
    console.log("Connected to db")
})
.catch((err)=>{
    console.log(err)
})