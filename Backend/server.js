const express = require('express');
const app = express()
const jwt=require("jsonwebtoken")  
const cloudinary = require('cloudinary')
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))

cloudinary.config({ 
    cloud_name: 'coder-404', 
    api_key: '334571629886163', 
    api_secret: '-D82BH02mo23NfUWH3ovgtbe6Vo' 
  });
  

app.use('/',login=express.Router());
require('./Routes/login')(login,jwt)


app.use('/',home=express.Router());
require('./Routes/home')(home,jwt,cloudinary)

app.use('/',like=express.Router());
require('./Routes/like')(like,jwt);


app.listen(8000,()=>{
    console.log("server is listening in this port 8000....")
})