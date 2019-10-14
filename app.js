//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-erdinc:erdinc@tsm-8sw91.azure.mongodb.net/blogDB",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const postsSchema = { header: String, content:String };
const Post = mongoose.model("Post", postsSchema);
const Post1 = new Post({ header: "Welcome", content: "First post has been send!!!" });
const defaultPost=[Post1];

var postArray = [];
var nameList = [];


app.get('/', (req, res) => {

  Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) { console.log(err); }
        else { console.log("success!!!"); }
      });
      res.redirect("/");
    }
    else
      res.render('home', { home: defaultPost[0].content,postNew:foundPost, menuId: "home" });
  });

});


app.get('/about', (req, res) => {

  Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) { console.log(err); }
        else { console.log("success!!!"); }
      });
      res.redirect("/");
    }
    else
      res.render('about', { about: defaultPost[0].content, menuId: "about" });
  });
});


app.get('/contact', (req, res) => {

  Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) { console.log(err); }
        else { console.log("success!!!"); }
      });
      res.redirect("/");
    }
    else
      res.render('contact', { contact: defaultPost[0].content, menuId: "contact" });
  });
});


app.get('/compose', (req, res) => {
  if (nameList.length !== 0)
    res.render('compose', { menuId: "compose" });
  else
    res.status(401).send('<h1>401 Unauthorized</h1><p>Please first login!!!</p>');
});


app.get('/login', (req, res) => {
  res.render('login', { menuId: "login" });
});


app.post('/login', (req, res) => {
  let userName = req.body.inputEmail;
  let password = req.body.inputPassword;

  nameList.push(userName);

  if (userName === 'admin' && password === 'admin')
    res.redirect('/compose');
  else
    res.redirect('/login');
});


app.post('/compose', (req, res) => {
  
  const newPostTitle = _.capitalize(req.body.postTitle);
  const newContent = _.capitalize(req.body.postArea);
  
Post.findOne({header:newPostTitle, content:newContent},(err,foundPost)=>{
  if(!err){
    if(!foundPost){
      const newPost = new Post({ header: newPostTitle, content: newContent});
      newPost.save();

        res.render('home', { home: defaultPost[0].content, postNew: newPost, menuId: "home" });
      
      // res.redirect("/");
     
    }
  }
});
  nameList = [];
  
});


app.get('/posts/:title', (req, res) => {

  let titlePost = req.params.title;

  postArray.forEach(function (value) {
    var storedTitle = value.title;

    if (_.lowerCase(titlePost) === _.lowerCase(storedTitle))
      res.render('post', { newRender: value, menuId: 'newpost' });
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
