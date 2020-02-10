const knex=require("../Model/knex")
module.exports=(app,jwt)=>{
    app.post('/register',(req,res)=>{
        var body_data =  {
            Username:req.body.Username,
            email:req.body.email,
            password:req.body.password
        }
        knex.register(body_data)
        .then((right)=>{
            var token = jwt.sign({
                "jwt": body_data
              }, 'secret');
              res.cookie(token)
              res.send('create...')
        })
        .catch((err)=>{
            res.json({"message":err})
        })
    })

    app.get('/login',(req,res)=>{
        let email = req.query.email
        let password = req.query.password
        console.log(email,password)
        knex.login(email)
        .then((data)=>{
            // console.log(data)
            if(data.length==0){
                res.json('you email in invalid')
            }
            else{
                if(data[0]['password']==password){
                    var token = jwt.sign({
                        "jwt": data}, 'aadil');
                      res.cookie(token)
                    //   console.log(token)
                      res.send('login...')
}
                else{
                    res.json('password is wrong')
                }
            }
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    
    app.get('/verify',(req,res)=>{
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        res.send(token)

        jwt.verify(token, 'aadil', (err,user_detail)=>{
            if(!err){
            }
            else{
                res.send(false)
            }
            
        })
    })

}