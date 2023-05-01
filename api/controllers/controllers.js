require('dotenv').config();
const passport = require("passport");
const {User} = require("../models/User");
const fs = require('fs');
const Post = require("../models/post");
const { S3Client } = require("@aws-sdk/client-s3");
const uploadToS3 = require("../uploadTos3");
const mongoose = require('mongoose');


const registerController= async (req,res)=>{
  
   await mongoose.connect(process.env.URI);
 

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

const loginController = async (req,res)=>{

  
   await mongoose.connect(process.env.URI);
 
  const {username, password} = req.body;
  const user = new User ({
    username: username,
    password: password
  })
    passport.authenticate('local')(req,res, ()=>{
    res.json({state: req.isAuthenticated()})
    })

}

const logoutController = async (req,res)=>{


   await mongoose.connect(process.env.URI);
 

  req.logOut(err=>{
    if(err){
      console.log(err);
    }}
);
res.json(req.isAuthenticated());

}

const profileController = async (req,res)=>{
  
 await   mongoose.connect(process.env.URI);
 

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

 
  await  mongoose.connect(process.env.URI);
 

   if(req.isAuthenticated){

    const {title, summary, content} = req.body;
    const {path, originalname, mimetype}= req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    //const newPath = path+'.'+ext;
    const newPath = Date.now()+'.'+ext;
   //fs.renameSync(path, newPath);
   const awsPath = await uploadToS3(path, mimetype, newPath);
    const newPost = await Post.create(
      {title: title, summary: summary, content: content, image: awsPath, author: req.user.id});
    
    //console.log(awsPath)
       res.json(awsPath);  
   }
   
}

const feedController = async (req,res)=>{

  await  mongoose.connect(process.env.URI);
 

  const state = req.isAuthenticated();
  const posts = await Post.find({})
  .populate('author', ['username'])
  .sort({createdAt:-1}).
  limit(20);
  //console.log(posts)
  res.json({posts, state: state, user: req.user});
}

const getPostController = async (req,res)=>{

  
   await  mongoose.connect(process.env.URI);
 

  if(req.isAuthenticated){
    const state= req.isAuthenticated();
    const id = req.params.id
    const findPost = await Post.findById(id);
  if(findPost){
  const post = await findPost.populate('author', ['username']);
  res.json({post, state});
  } 
  }
}

const updateController = async (req,res)=>{

  
  await  mongoose.connect(process.env.URI);
 

let newPath = null;
if(req.file){
    const {path, originalname, mimetype}= req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    newPath = Date.now()+'.'+ext;
   //fs.renameSync(path, newPath);
   const awsPath = await uploadToS3(path, mimetype, newPath);
   const {id, title, summary, content} = req.body;

const post = await Post.findById(id);
if(post.author._id.toString() === req.user.id){
  try{
    await Post.updateOne({_id:id}, {$set: req.body, image: awsPath? awsPath: post.image}).then(
      updatedArticle=>{
        res.json(updatedArticle);
      });
  }
  catch(err){
    res.send(err)
  }
  
}
}


}


const deleteController= async (req,res)=>{

 
   await mongoose.connect(process.env.URI);
 

  await Post.findById(req.params.id).then(post=>{
    if(post){
      post.deleteOne({id: req.params.id})
    }
  })
  res.json('done');
}

module.exports={
  registerController,
  loginController,
  logoutController,
  profileController,
  submitController,
  feedController ,
  getPostController,
  updateController,
  deleteController
};