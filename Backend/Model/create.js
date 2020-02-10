const knex=require("./connection")


knex.schema.hasTable('register').then(function (exists) {
    if (!exists) {
        knex.schema.createTable('register', (table) => {
        table.increments('user_id')
        table.string('Username')
        table.string('email').unique()
        table.string('password')
}) 
} else {
    console.log('register_ALREADY EXIST!');
}
})


knex.schema.hasTable('user_post').then(function (exists) {
    if (!exists) {
    return knex.schema.createTable('user_post', (table) => {
        table.increments('post_id')
        table.integer('user_id')
        table.string('post_url')
        table.string('caption')
           
}) 
} else {
    console.log('user_post__table ALREADY EXIST!');
}
})

knex.schema.hasTable('post_like').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('post_like', function (table) {
            table.increments('id').primary();
            table.string('user_id', 30)
            table.string("post_id", 30);
            table.string('Like', 30);
            table.string('Dislike', 30);
            table.string("comments") 
        })
    } else {
        console.log('Like&dislike__table ALREADY EXIST!');

    }
})
 



knex.schema.hasTable('Bio_detail').then(function (exists) {
    if (!exists) {
    return knex.schema.createTable('Bio_detail', (table) => {
        table.increments('id')
        table.integer("user_id").unsigned()        
        table.foreign("user_id").references("register.user_id"),
        table.date('data_brith')
        table.string('email').unique
        table.integer('phone_number')
}) 
} else {
    console.log('Bio__table ALREADY EXIST!');
}
})