//require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"
dotenv.config({ path: '/.env' })

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`🟢 Server is running at Port: ${process.env.PORT}`);  
    }) 
})
.catch((err)=>{
    console.log(" ❗MongoDB Connection Failed !!!:",err);    
})
















/*

##old Approch ##

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express"  
const app = express()

( async ()=>{
    try {

       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

       app.on("error",(error)=>{
        console.log("Error:",error);
        throw error
         })

        app.listen(process.env.PORT,()=>{
            console.log(`App listen on potr ${process.env.PORT}`);    
        })
      
    } catch (error) {
       
        console.error("Error:",error)
        throw error
        
    }
})()
    */