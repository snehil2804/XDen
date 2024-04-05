// index.js

var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post");
const upload=require("./multer")

const passport=require("passport");
const localStrategy=require("passport-local");
const user = require('./users');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get("/register",(req,res)=>{
  res.render("register")
});
router.get("/login",(req,res)=>{
  res.render("login.ejs")
});
router.get("/profile",isLoggedIn,async (req,res)=>{
  const user=await userModel
                    .findOne({username:req.session.passport.user})
                    .populate("posts").populate("bookmarks").populate("likedposts") //populate is used to get the posts,bookmarks and likedposts of the user

  res.render("profile",{user});
});

router.get("/show/posts",isLoggedIn,async (req,res)=>{
  const user=await userModel
                    .findOne({username:req.session.passport.user})
                    .populate("posts")

  res.render("show",{user});
});

router.get("/liked/posts",isLoggedIn,async (req,res)=>{
  const user=await userModel
                    .findOne({username:req.session.passport.user})
                    .populate("likedposts")

  res.render("liked",{user});
});
router.get("/saved/posts",isLoggedIn,async (req,res)=>{
  const user=await userModel
                    .findOne({username:req.session.passport.user})
                    .populate("bookmarks")

  res.render("saved",{user});
});

router.get("/add",isLoggedIn,async (req,res)=>{
  const user=await userModel.findOne({username:req.session.passport.user})
  res.render("add",{user});
});

router.get("/index", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    const posts = await postModel.find().populate("user");    //populate is used to get the user details of the post
    // const bookmark=await userModel.findOne({username:req.session.passport.user}).populate("bookmarks"); //populate is used to get the bookmarks of the user

    res.render("index", { user, post: posts,loggedInUser: req.session.passport.user }); //req.session.passport.user is the username of the logged in user
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/createpost", isLoggedIn, upload.single("postimage"), async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags.toLowerCase().split(" "),  // Split tags by space and store as an array
      image: req.file.filename,
      createdAt: new Date() // Save the current date and time as the creation date
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal server error");
  }
});


router.post("/fileupload",isLoggedIn,upload.single("profileImage"),async(req,res)=>{
 const user=await userModel.findOne({username:req.session.passport.user})
 user.profilepicture=req.file.filename;
 await user.save();
 res.redirect("/profile")

});

router.get("/index",(req,res)=>{
  res.render("index.ejs")
});
router.get('/tags/suggestions', async (req, res) => {
  try {
      const searchQuery = req.query.query;
      // Fetch unique tags from your posts collection based on the searchQuery
      const uniqueTags = await postModel.distinct('tags', { tags: { $regex: new RegExp(searchQuery, 'i') } });
      res.json(uniqueTags);
  } catch (error) {
      console.error('Error fetching tag suggestions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/register",function(req,res,next){
  const data=new userModel({
    username:req.body.username,
   
    name:req.body.name,
    // password:req.body.password,
    profilepicture:req.body.profilepicture,
    contact:req.body.contact
  })
  userModel.register(data,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
});

router.post("/login", passport.authenticate("local",{
  failureRedirect:"/login",
  successRedirect:"/profile"
}),function(req,res,next){
});

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
  res.redirect("/");
});
});
// router.delete("/posts/:id",isLoggedIn,async(req,res)=>{
//   try{
//     //find the user by username
//     const user=await userModel.findOne({username:req.session.passport.user});
//     //find the post by id and remove it
//     const postIndex=user.posts.indexOf(req.params.id);
//     if(postIndex>-1){
//       user.posts.splice(postIndex,1);
//       await user.save();
//       res.status(200).send({message:"Post deleted successfully"});

//     }
//     else{
//       res.status(404).send({message:"Post not found"});
//     }
//   } catch(error){
//     console.error("Error deleting post:",error);
//     res.status(500).send({error:"Internal server error"});
//   }
// });
// I have changed the above route to the below code as the above code is not deleting the post from the post collection and it was only deleting from the user post array.

router.delete("/posts/:id", isLoggedIn, async (req, res) => {
  try {
    // Find the post by ID and delete it
    const post = await postModel.findByIdAndDelete(req.params.id);

    if (post) {
      // If the post was deleted successfully, remove its reference from the user
      const user = await userModel.findOne({ username: req.session.passport.user });
      const postIndex = user.posts.indexOf(req.params.id);
      if (postIndex > -1) {
        user.posts.splice(postIndex, 1);
        await user.save();
      }

      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      // If the post was not found
      res.status(404).send({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});


router.post("/like/:id", isLoggedIn, async (req, res) => {
  try {
      const postId = req.params.id; // send the post ID as a parameter // this is send from the LikedPost.js file by the client to server to like the post
      const user = await userModel.findOne({ username: req.session.passport.user });// find the user by username
      const post = await postModel.findById(postId);// find the post by ID which user has liked / as the user has clicked the like button and send that particular post id to the server to like the post
      
      // Check if the post has already been liked by the user
      if (post.noOfLikes.includes(user.username)) { //yeh check karega ki agar jo post schema ke andar jo array hai jo hmne banaya hai "noOfLikes" jo username of person store karta hai . agar username already present hai to return true karega 
          // If the post is already liked, remove the like
          const index = post.noOfLikes.indexOf(user.username);
          post.noOfLikes.splice(index, 1); // yaha par hmne post schema ke andar jo array hai "noOfLikes" usme se user.username ko remove kar diya, kyuki usne dubara click kia hai like button par
          await post.save(); // save the post
          // Remove the post ID from the user's likedposts array
          const userIndex = user.likedposts.indexOf(postId);// or yaha pr hmne user schema ke andar jo array hai "likedposts" usme se post id ko remove kar diya // yeh check karega ki jo post id hai wo user ke likedposts array me present hai ya nahi agar present hai to usko remove kar dega
          user.likedposts.splice(userIndex, 1);
      } else {
          // If the post has not been liked yet, add the like
          post.noOfLikes.push(user.username);
          await post.save();

          // Add the post ID to the user's likedposts array
          user.likedposts.push(postId);
      }

      await user.save();// Redirect back to the index page or wherever appropriate
      res.redirect("/index");
  } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).send("Internal server error");
  }
});
router.post("/bookmark/:id",isLoggedIn,async(req,res)=>{
  try{
    const postId=req.params.id; //send the post ID as a parameter.. yaha pr particular post ki id aayegi jo user ne bookmark karna hai
    const user=await userModel.findOne({username:req.session.passport.user});//find the user by username
    // const post=await postModel.findById(postId);
    if(user.bookmarks.includes(postId)){ // Check if the post has already been bookmarked by the user and is present in the user's bookmarks array
      const index=user.bookmarks.indexOf(postId); // If the post is already bookmarked, remove it from the user's bookmarks array
      user.bookmarks.splice(index,1);// yaha pr hmne user schema ke andar jo array hai "bookmarks" usme se post id ko remove kar diya
    }
    else{ // If the post has not been bookmarked yet, add it to the user's bookmarks array
      user.bookmarks.push(postId);// yaha pr hmne user schema ke andar jo array hai "bookmarks" usme post id ko add kar diya
    }
    await user.save();
    res.redirect("/index");
  }catch(error){
    console.error("Error bookmarking post:",error);
    res.status(500).send("Internal server error");
  }
});

router.get("/tags/:tag", isLoggedIn, async (req, res) => {
  // We are going to use regex to search for the particular tag in the tags array of the post schema
  const regex = new RegExp(req.params.tag, "i"); // i is used to make the search case insensitive
  console.log(regex);
  const posts = await postModel.find({ tags: regex });

  // Log the response data to inspect its structure
  

  // Extract unique tags from posts
  const uniqueTags = new Set();
  posts.forEach(post => {
      // Ensure that post.tags is an array before processing
      if (Array.isArray(post.tags)) {
          
          post.tags.forEach(tag => {
              uniqueTags.add(tag);
          });
      } else {
          console.log('post.tags is not an array:', post.tags);
      }
  });

  // Convert unique tags Set to array
  const tags = Array.from(uniqueTags);

  res.json(tags);
});
router.get("/tagss/:tag", async (req, res) => {
  try {
      const tag = req.params.tag;
      const user = await userModel.findOne({ username: req.session.passport.user });
      console.log("User:", user); // Log user object to verify it's fetched correctly
      const loggedInUser = req.session.passport.user;
      // Fetch posts related to the selected tag from the database
      const posts = await postModel.find({ tags: tag }).populate("user");

      res.render("tagss", { tag, posts, loggedInUser, user });
  } catch (error) {
      console.error("Error fetching posts for tag:", error);
      res.status(500).send("Internal server error");
  }
});




function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
