//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var postArray = [];
var nameList = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render('home', { home: homeStartingContent, postNew: postArray, menuId: "home" });
});


app.get('/about', (req, res) => {
  res.render('about', { about: aboutContent, menuId: "about" });
});


app.get('/contact', (req, res) => {
  res.render('contact', { contact: contactContent, menuId: "contact" });
});


app.get('/compose', (req, res) => {
  if (nameList.length !== 0) 
    res.render('compose');
  else
    res.status(401).send('<h1>401 Unauthorized</h1><p>Please first login</p>');
});


app.get('/login', (req, res) => {
  res.render('login');
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
  const publishPost = {
    title: req.body.postTitle,
    posting: req.body.postArea
  };
    postArray.push(publishPost);
  nameList = [];
    res.redirect('/');
    
});


app.get('/posts/:title', (req, res) => {

  let titlePost = req.params.title;

  postArray.forEach(function (value) {
    var storedTitle = value.title;

    if (_.lowerCase(titlePost) === _.lowerCase(storedTitle))
      res.render('post', { newRender: value });
  });

});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
