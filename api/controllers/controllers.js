const passport = require("passport");
const {User} = require("../models/User");
const session = require('express-session');

const registerController=  (req,res)=>{
   const {username, password} = req.body;
   console.log(req.sessionID)
   console.log(req.user)
   try{ 
    User.register(new User({username: username, active: false}), password, (err,user)=>{
    if(err){ 
      res.status(400).json(err);
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
  const {username, password} = req.body;
  const user = new User ({
    username: username,
  })
  console.log(req.sessionID)
  console.log(req.user)
   req.login(user, err=>{
      if(err){
        res.status(400).json(err);
        console.log(err);
      }
      else{
        passport.authenticate('local')(req,res, ()=>{
          res.json(req.isAuthenticated())
        })
      }
     });  
}

const logoutController = (req,res)=>{
  console.log(req);
  req.logOut(err=>{
    if(err){
      console.log(err);
    }}
);
res.json(req.isAuthenticated());

}

const profileController = (req,res)=>{
  try{
    console.log(req.sessionID)
    console.log(req.user)
    res.send({state: req.isAuthenticated()});
  }
  catch(err){
    console.log(err)
  }
  
}

module.exports={
  registerController,
  loginController,
  logoutController,
  profileController 
};