const knex = require("../conection.js")
//  profile = ()=>{
//      return knex.select("name").from("regisetr")
//  }
let showUserName =(user_id)=>{
    return knex.select("name").from("user_register")
}

let profile=(user_id)=>{
    return knex.select('*').from('user_register').havingIn('user_id',user_id)
    // .from("edit_profile").insert(user_data)

}
let myProfile = (user_data)=>{
    return knex.select("*").from("edit_profile").insert(user_data)
}
module.exports={profile,myProfile,showUserName}