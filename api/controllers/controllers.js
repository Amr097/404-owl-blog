const passport = require("passport");
const {User} = require("../models/User");
const fs = require('fs');
const Post = require("../models/post");


const registerController=  (req,res)=>{
   const {username, password} = req.body;
   
   try{ 
    User.register(new User({username: username, active: false}), password, (err,user)=>{
    if(err){ 
      res.status(400).json("err");
      console.log(err);
  }
    else{
     res.json('registered');  
    }  
   });
       
}
  catch(err){res.status(400).json(err)}
          
} 

const loginController = (req,res)=>{
 // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  const {username, password} = req.body;
  const user = new User ({
    username: username,
    password: password
  })
  //console.log(req.sessionID)
  //console.log(req.user)
  passport.authenticate('local')(req,res, ()=>{
    res.json({state: req.isAuthenticated()})
    })
    //console.log(req.isAuthenticated())
}

const logoutController = (req,res)=>{
  req.logOut(err=>{
    if(err){
      console.log(err);
    }}
);
res.json(req.isAuthenticated());

}

const profileController = async (req,res)=>{
  try{
       
    if(req.user){
      const user = await User.findById(req.user.id)
      res.json({state: req.isAuthenticated(), user: user});
  }
  
  else{
    res.json({state: req.isAuthenticated()})
  }

  }
  catch(err){
    console.log(err)
  }
  
}

const submitController = async (req,res)=>{
   if(req.isAuthenticated){

    const {title, summary, content} = req.body;
    const {path, originalname}= req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    const newPost = await Post.create(
      {title: title, summary: summary, content: content, image: newPath, author: req.user.id});
    
      res.json(newPost);  
   }
   
}

const feedController = async (req,res)=>{
  const state = req.isAuthenticated();
  //console.log(req.user);
  const posts = await Post.find({})
  .populate('author', ['username'])
  .sort({createdAt:-1}).
  limit(20);
  //console.log(req.user);
  res.json({posts, state: state, user: req.user});
}

const getPostController = async (req,res)=>{
  if(req.isAuthenticated){
    const state= req.isAuthenticated();
    const id = req.params.id
const findPost = await Post.findById(id);
const post = await findPost.populate('author', ['username'])
   
   
   res.json({post, state});
  }
}

const updateController = async (req,res)=>{
let newPath = null;
if(req.file){
    const {path, originalname}= req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
}

const {id, title, summary, content} = req.body;

const post = await Post.findById(id);
if(post.author._id.toString() === req.user.id){
  try{
    console.log("works")
    await Post.updateOne({_id:id}, {$set: req.body, image: newPath? newPath: post.image}).then(
      updatedArticle=>{
        res.json(updatedArticle);
      });
  }
  catch(err){
    res.send(err)
  }
  
}
//console.log(post.author._id.toString())


}

module.exports={
  registerController,
  loginController,
  logoutController,
  profileController,
  submitController,
  feedController ,
  getPostController,
  updateController
};