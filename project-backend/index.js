//const express=require("express");
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb+srv://harsh:harsh@cluster0.ja51q.mongodb.net/LoginRegisterDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology:true
},()=>{
    console.warn("DB connected")
});

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = new mongoose.model("User",userschema)


app.post("/Login",function(req,res)
{
    const {email,password}=req.body;
    User.findOne({email:email}, (err,user) =>
    {
        if(user)
        {
            if(password === user.password)
            {
                res.send({message:"Login Succesfull",user:user})
            }
            else{
                res.send({message:"password didn't match"})
            }
        } 
        else
        {
            res.send({message:'user not register'})
        }  
    })
})

app.post("/Register",function(req,res)
{
    const {name,email,password}=req.body;
    User.findOne({email:email}, (err,user) =>
    {
        if(user)
        {
            res.send({message:"user is already registered"})
        }
        else{
            const user=new User(
                {
                    name,
                    email,
                    password
                })
            
                user.save(err=>{
                    if(err)
                    {
                        res.send(err)
                    }
                    else{
                        res.send({message:"successfully registered,please login now!"})
                    }
                })
        }
    })
    
})

app.listen(9700,()=>{
    console.log("Be Started")
});


