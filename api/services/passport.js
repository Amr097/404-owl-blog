const passport= require('passport');

const {User} = require("../models/User");

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    //console.log(user._id)
    done(null, user._id);
  });

passport.deserializeUser((async (id, done) => {
    try {
        let Account = await User.findById(id, "name email _id");

        if(Account){
            done(null, Account);}
        else {
            return done(new Error('user not found'));}
        } 
    catch (error) {done(error, null);}
  }));  

module.exports = passport;