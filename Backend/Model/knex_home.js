const knex=require("./connection")

let user_id = (email)=>{
    return knex('register').select('*').where('register.email',email)
}
let create_post = (user_id,caption,post_url)=>{
    return knex('user_post').insert({"user_id":user_id,"post_url":post_url,"caption":caption})
}

let get_home = () =>{
    return knex("user_post").select('post_url','caption','post_id')
}
let len = (post_id) =>{ 
    return knex ('user_post').select("user_post.post_id","user_post.user_id",'user_post.post_url','user_post.caption',"post_like.comments","register.Username")
    .join('register',"register.user_id",'=','user_post.user_id')
    .join("post_like",'user_post.post_id','=','post_like.post_id')
    .where({'post_like.post_id':post_id})
}   

let get_data = () =>{
    return knex("user_post").select('*')
}   

module.exports={user_id ,create_post, get_home, len, get_data}