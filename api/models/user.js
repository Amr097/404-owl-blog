const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new Schema({
   username: {
    type: {},
    required: true,
    min:4,
    unique:true
  },
   
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const User = new model('User', UserSchema);

module.exports = {
    User: User
  }