const express = require('express');
var editProfile = express.Router();
editProfile.use(express.json())
const add = require("../Model/editprofileDb");
const jwt = require('jsonwebtoken')

editProfile.get("/userName",function(req,res){
    let token = req.headers.cookie
    console.log(token)
    jwt.verify(token,"secret_key",(err,result)=>{
        let response = add.showUserName()
        response.then((data)=>{
            res.send(data)
        }).catch((err)=>{
            console.log(err)
            res.json({"massage":"wrong"})
        })
    })
})
editProfile.post("/edit_profile",function(req,res){
    let token = req.headers.cookie
    let user_data = {
        phone_number:req.body.phone_number,
        email_id:req.body.email_id,
        birth_date:req.body.birth_date,
        education:req.body.education,
        address:req.body.address,
        bio:req.body.bio
    }
    jwt.verify(token,"secret_key",(err,result)=>{
        let response=add.myProfile(user_data)
        response.then((data)=>{
            res.json({
                "massage":"profile update"
            })

        }).catch((err)=>{
            console.log(err)
            res.json({"massage":"wrong"})
        })
    })
})

editProfile.get("/profile",function(req,res){
    
})

module.exports = editProfile