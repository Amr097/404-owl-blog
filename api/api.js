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

const port = 4000;

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

app.use(cors({
    credentials: true,
    origin: true,
}));

app.use(express.json());



app.use(bodyParser.urlencoded({extended: true}));


app.use(Route);


mongoose.connect(process.env.URI);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));