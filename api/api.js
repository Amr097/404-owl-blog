require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const https = require('https')



const passport = require("./services/passport.js");
const Route = require("./routes/Routes.js");

const app = express();


const port = process.env.PORT || 4000;


app.use(cors({
    credentials: true,
    origin: true,
}));

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongoUrl: process.env.URI
    }),
    cookie:{maxAge:1000*60*60*24}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());



app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static(__dirname + "/uploads"));



app.use(Route);


if(port){
    app.listen(port, console.log(`server runs on port ${port}`))
}


if(process.env.URI){
   mongoose.connect(process.env.URI);
}



module.exports = app;
