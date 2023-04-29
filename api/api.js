require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');



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

if(process.env.URI){
   mongoose.connect(process.env.URI);
}

if(port){
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = app;
