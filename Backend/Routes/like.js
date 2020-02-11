const knex = require('../Model/likeDb')

module.exports=(app,jwt)=>{
    app.post('/like', (req, res) => {
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, "aadil", (err, data) => {
            var user_id = data['jwt'][0]['user_id']
            var post_id = req.body.post_id
            if(!err){
                knex.like(user_id,post_id)
                    .then((data1) => {
                    if (data1.length > 0) {
                        knex.like_update(user_id,post_id)
                        .then(() => {
                            res.send("like..")
                            })
                            .catch((err) => {
                                res.json(err)
                            })
                    }
                    else {
                        knex.like_insert(user_id,post_id)
                            .then(() => {
                              res.send("like..")
                            })
                            .catch((err) => {
                                res.json(err)
                            })
                    }
                })
            }
            else{
                res.json({"message":err})
            }
            
        })
    })

    app.post('/dislike', (req, res) => {
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, "aadil", (err, data) => {
            if(!err){
                var user_id = data['jwt'][0]['user_id']
                var post_id = req.body.post_id
                knex.dislike(user_id,post_id)
                .then((data1) => {
                    if (data1.length > 0) {
                        knex.update_dis(user_id, post_id)
                            .then(() => {
                                res.send('Dislked')
                            }).catch((err) => {
                                res.send(err)
                            })
                    } 
                    else {
                        knex.insert_dis(user_id, post_id)
                        .then(() => {
                            res.send('Disliked')
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                    }
                })
            }
            else{
                res.send(err)
            }
    })
    })
    app.get('/like_dislike', (req, res) => {
        var token=req.headers.cookie.split(" ")
        token=(token[token.length-1]).slice(0,-10)
        jwt.verify(token, "aadil", (err, data) =>  {
            var post_id = req.body.post_id
            knex.get_like(post_id)
                .then((data) => {
                    const like = (data.length)
                    knex.get_dislike(post_id)
                    .then((data1) => {
                        const dislike = data1.length
                        res.send({ "like": like, "dislike": dislike })
                        })
                        .catch((err) => {
                            res.send(err)
        
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    })

})
}

