

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload=require('express-fileupload');
const sessions=require('express-session');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const foodblogapp = express();
const env = require('dotenv');
const path = require('path');
//const socketIo = require('socket.io');
const http=require('http');
const server=http.createServer(foodblogapp);
//const io =socketIo(server);
const routes = require('./server/routes/reciper.js');
const port = process.env.PORT || 3000
env.config()

foodblogapp.use(express.urlencoded({ extended: true }));
foodblogapp.use(express.static('public'));
//io.on('connection',(socket)=>{
 // console.log('new user conected')
//});
foodblogapp.use(expressLayouts);

foodblogapp.use(cookieParser('CookingBlogSecure'));
foodblogapp.use(sessions({
  secret:process.env.CookingBlogSecretSession,
  saveUninitialized: true,
  resave: true
}));
foodblogapp.use(function(req, res, next) {
  res.locals.userId = req.session.userId;
  res.locals.userName = req.session.username;
  next();
});

foodblogapp.use(flash());
foodblogapp.use(fileUpload());


foodblogapp.set('layout', './layouts/main');
foodblogapp.set('views', path.join(__dirname, 'views'));
foodblogapp.set('view engine', 'ejs');
foodblogapp.use('/', routes)



//const { Socket } = require('socket.io-client');





foodblogapp.listen(port, () => { console.log('Listening to port ${port}')});



