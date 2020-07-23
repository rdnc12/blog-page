require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const postsSchema = {
  header: String,
  content: String,
  createdAt: {
    type: String,
    default: new Date(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  comment: String,
};
const Post = mongoose.model("Post", postsSchema);
const User = mongoose.model("User", { username: String, password: String });

const Post1 = new Post({
  header: "Welcome",
  content: "First post has been send!!!",
});
const defaultPost = [Post1];

var nameList = [];

app.get("/", async(req, res) => {
  await Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success!!!");
        }
      });
      res.redirect("/");
    } else
      res.render("home", {
        home: defaultPost[0].content,
        postNew: foundPost,
        menuId: "home",
      });
  });
});

app.get("/about", async(req, res) => {
  await Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success!!!");
        }
      });
      res.redirect("/");
    } else
      res.render("about", { about: defaultPost[0].content, menuId: "about" });
  });
});

app.get("/contact",  async(req, res) => {
  await Post.find({}, (err, foundPost) => {
    if (foundPost.length === 0) {
      Post.insertMany(defaultPost, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success!!!");
        }
      });
      res.redirect("/");
    } else
      res.render("contact", {
        contact: defaultPost[0].content,
        menuId: "contact",
      });
  });
});

app.get("/compose", (req, res) => {
  if (nameList.length !== 0) res.render("compose", { menuId: "compose" });
  else
    res
      .status(401)
      .send("<h1>401 Unauthorized</h1><p>Please first login!!!</p>");
});

app.get("/login", (req, res) => {
  res.render("login", { menuId: "login" });
});

app.post("/login", (req, res) => {
  let userName = req.body.inputEmail;
  let password = req.body.inputPassword;

  // User.find(userName).then(user=>{
  //   if(user){
  //     res.send("User logged in");
  //   }else{
  //     res.status(401).send("Wrong username or password");
  //   }
  // });

  if (userName === "admin" && password === "admin") res.redirect("/compose");
  else res.redirect("/login");
});

app.post("/compose", (req, res) => {
  const newPostTitle = _.capitalize(req.body.postTitle);
  const newContent = _.capitalize(req.body.postArea);

  // if(!newPostTitle || !newContent){
  //   res.status(400).send("Missing informations");
  //   return;
  // }

  Post.findOne(
    { header: newPostTitle, content: newContent },
    (err, foundPost) => {
      if (!err) {
        if (!foundPost) {
          const newPost = new Post({
            header: newPostTitle,
            content: newContent,
          });
          newPost.save();
          res.redirect("/");
        } else
          res.render("home", {
            home: defaultPost[0].content,
            postNew: newPost,
            menuId: "home",
          });
      }
    }
  );
  nameList = [];
});

// app.post("/like/:likeId", (req, res) => {
//   const IdPost = req.params.likeId;

//   Post.findById(IdPost).then((foundLike) => {
//     if (foundLike) {
//       foundLike.likes = foundLike.likes + 1;
//     }
//   });
// });

app.get("/posts/:title", (req, res) => {
  let titlePost = _.capitalize(req.params.title);

  Post.findOne({ header: titlePost }, (err, foundPost) => {
    if (!err) {
      if (foundPost) {
        res.render("post", { newRender: foundPost, menuId: "newpost" });
      }
    }
  }).populate("user", ["username"]);
});

app.post("/delete", (req, res) => {
  const IdPost = req.body.postId;

  Post.findByIdAndRemove(IdPost).then(() => {
    res.redirect("/");
  });
});

// app.post('/search', (req, res) => {

//   const searchText = req.body.searchText;

//   Post.find({})

// });

// app.post('/register', (req, res) => {

//   let { username, password } = req.body;

//   if (!username || !password) {
//     res.status(400).send("No username or password...");
//     return;
//   }
//   const user = new User({ username, password });

//   user.save().then(savedUser => {
//     res.send(savedUser);
//   });

// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function () {
  console.log("Server has started.");
});
