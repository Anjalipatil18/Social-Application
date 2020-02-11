const knex=require("./knex")

// >>>>>>>>>>>>>>>>>>>>>>>>> this for like <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

let like = (user_id,post_id) =>{
    return knex('post_like').select('*').where({ "post_id":post_id , "user_id": user_id})
}

let like_update = (user_id,post_id) =>{
    return knex('post_like').update({'Like': 'Yes','Dislike': "no"}).where({'post_id': post_id,'user_id': user_id})
}
let like_insert = (user_id,post_id) =>{
    return knex('post_like').insert({'post_id': post_id,'user_id':user_id, 'Like': 'yes', 'Dislike': "no"})
}

// >>>>>>>>>>>>>>>>>>>>>>> this for dislike <<<<<<<<<<<<<<<<<<<<<<<<<<<<

let dislike = (user_id,post_id) =>{
    return knex('post_like').select('*').where ({"post_id": post_id, "user_id": user_id})
}

let update_dis = (user_id,post_id)=>{
    return knex('post_like').update({ 'Like': 'no', 'Dislike': "Yes" }) .where({ 'post_id': post_id, 'user_id': user_id})
}

let insert_dis = ()=>{
    return knex('post_like').insert({'post_id': post_id,'user_id': user_id,'Like': 'no','Dislike': "Yes"})
}

// >>>>>>>>>>>>>>>>>>>>>>>> get_like and dislike <<<<<<<<<<<<<<<<<<<<<<<<<

let get_like = (post_id)=>{
    return  knex('post_like') .select('*')
    //  .where({"post_id": post_id, "Like": "yes" })
}

let get_dislike = (post_id) =>{
    return knex('post_like').select('*')
    .where({"post_id": post_id,"Dislike": "yes" })
}

module.exports = {like, like_update, like_insert , dislike, update_dis , insert_dis,get_like, get_dislike}