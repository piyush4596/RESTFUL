const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "devloper",
    content: "making website",
  },
  {
    id: uuidv4(),
    username: "Piyush",
    content: "finding job",
  },
  {
    id: uuidv4(),
    username: "Akash",
    content: "java devloper",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post == undefined) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("show.ejs", { post });
  console.log(post);
});

app.listen(port, () => {
  console.log(`Listening to post: ${port}`);
});
