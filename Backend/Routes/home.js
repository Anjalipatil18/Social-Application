const knex=require("../Model/knex_home")
const upload =require('./multer')
const fs = require ('fs')
var map = new Map()
module.exports=(app,jwt,cloudinary)=>{
app.post('/image',upload.single('image'),async(req,res)=>{
    var token=req.headers.cookie.split(" ")
    token=(token[token.length-1]).slice(0,-10)
    jwt.verify(token, 'aadil', (err,user_detail)=>{
       if(!err){
            var email = user_detail['jwt'][0]['email']
            knex.user_id(email)
            .then((data)=>{
                var user_id = data[0]['user_id'];
                var post_url = req.body.post_url
                var caption = req.body.caption;
                knex.create_post(user_id,post_url,caption)
                .then(()=>{
                    res.send("done")
                    
                })
                .catch((err)=>{
                    res.json(err)
                }) 
                
            })
            .catch((err)=>{
                res.json(err)
            })
            // cloudinary.v2.uploader.upload(req.file.path, 
            //     function(error, result) {
            //       if (!error){
            //         knex.image(main_data)
            //         .then((data)=>{
            //             res.send(data)
            //         })
            //         .catch((err)=>{
            //             res.send(err)
            //         })
            //       }else{    
            //         res.send(error)
            //       }
            // })
            
        }
        else{
            res.send(err)

            }
        })   
    })

             
   
    app.get('/home',(req,res)=>{
        let list=[];
        knex.get_home()
        .then( async (data)=>{
            var len = data.length
            for(var i=1; i<=len; ++i){
                // console.log(i);
                await knex.len(i)                
                .then((like_data)=>{    
                    like=like_data.length
                   let  main_data ={
                        "user_name":like_data[0]['Username'],
                        "post_id":like_data[0]['post_id'],
                        "user_id":like_data[0]['user_id'],
                        "post_url":like_data[0]['post_url'],
                        "caption":like_data[0]['caption'],
                        "comments":like_data[0]['comments'],
                        "like":like
                    }
                    list.push(main_data)
                    // console.log(list);
                    
                   })
                .catch((err)=>{
                    res.send(err)
                })   
            }
            res.send(listB)
                        
        })

        .catch((err)=>{
            res.send(err)
        })
    })

}