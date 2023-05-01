# 404 Owl Blog App
Full-Stack blogging platform built with React, Express, NodeJs && MongoDB.


## Features
- Create , Update , Delete, Read blogs
- Safely register to the app, the user's password is saved hashed and salted to the database.
-User Authentication
- Markdown Editor - Make changes, See changes: Instantly see what your Markdown documents look like in HTML    whilst typing .
- Sync Scrolling While you type, LivePreview will automatically scroll to the current location.


# Installation
### Clone this repository
$ git clone 

### Back-end directory
$ cd server

### Front-end directory
$ cd client

### Install dependencies 
$ npm install 

### Setup environment variables
$ In backend folder, create a file called '.env' 
$ Declare the following variables as env vars : SECRET ='some secure string'(required), URI =mongodb://localhost/blogdb (if db doesn't exist, it'll create one.), DB_URI_ATLAS='the url from mongo cloud atlas' (optional), PORT = 'your port number ' 
$ This application uses S3 buckets public cloud storage to store files, you will need to generate AWS secret and access key and name them as such ---> `AWS_S3_SECRET_KEY && AWS_S3_ACCESS_KEY` in your .env file


### Run the api server
$ node api.js

### Run the client
$ npm start




