// users.js

const plm = require('passport-local-mongoose');

// users.js
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  dbName: 'XDen' // Optional: specify the name of your database if different from the default
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));


const userSchema = new mongoose.Schema({
    username: String,
    
    name: String,
    password: String,
    profilepicture: String,
    contact: Number,
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    likedposts: [{  // New array to store the IDs of posts that the user liked
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
