let mongoose = require('mongoose');

let Post = mongoose.model('Post', {
    text: String,
    posted_at: Date,
    likes_count: Number,
    author: String
})
console.log('create_tables');

module.exports = Post;