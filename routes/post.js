// post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    noOfLikes: [{
        type: String  // Stores the usernames of users who liked the post
    }],
    tags: [String]  // New field to store an array of tags
});

module.exports = mongoose.model('Post', postSchema);
