import axios from "axios";
import ejs from "ejs";
import express from "express";

const APP = express();
const PORT = 4000;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.static("public"));
APP.use(express.json());

APP.get("/posts", (req, res) => {
  res.json(posts);
});

APP.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);

  var searchIndex = posts.findIndex((post) => {
    return post.id === id;
  });

  var post = posts[searchIndex];

  res.json(post);
});

APP.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  var searchIndex = posts.findIndex((post) => {
    return id === post.id;
  });

  posts.splice(searchIndex, 1);

  res.json(posts);
});

APP.patch("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);

  var searchIndex = posts.findIndex((post) => {
    return id === post.id;
  });

  const editedPost = {
    id: id,
    postTitle: req.body.title || posts[searchIndex].postTitle,
    postContent: req.body.content || posts[searchIndex].postContent,
    postAuthor: req.body.author || posts[searchIndex].postAuthor,
  };

  posts[searchIndex] = editedPost;

  res.json(posts);
});

APP.post("/new", async (req, res) => {
  var newPost = {
    id: posts.length + 1,
    postTitle: req.body.title,
    postContent: req.body.content,
    postAuthor: req.body.author,
  };

  posts.push(newPost);

  res.json(posts);
});

APP.listen(PORT, () => {
  console.log("API Starting...");
});

const posts = [
  {
    id: 1,
    postTitle: "Post 1",
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie, est vel fermentum vestibulum, lorem dui lobortis metus, a consequat lacus mi vitae sem. Fusce varius rutrum sem. Nullam sed dictum elit. Nulla vel tempor magna. Pellentesque ultricies justo a dui suscipit, in euismod ligula pharetra. Aenean arcu ante, consectetur condimentum enim at, pretium dictum justo. Suspendisse ut lorem id purus ultrices tincidunt ut et lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sed suscipit nibh. Morbi mattis, orci eget rhoncus dapibus, sapien dui commodo dui, eu pharetra erat ex sit amet neque. Praesent hendrerit eu metus quis tristique.",
    postAuthor: "Joe",
  },
  {
    id: 2,
    postTitle: "Post 2",
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie, est vel fermentum vestibulum, lorem dui lobortis metus, a consequat lacus mi vitae sem. Fusce varius rutrum sem. Nullam sed dictum elit. Nulla vel tempor magna. Pellentesque ultricies justo a dui suscipit, in euismod ligula pharetra. Aenean arcu ante, consectetur condimentum enim at, pretium dictum justo. Suspendisse ut lorem id purus ultrices tincidunt ut et lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sed suscipit nibh. Morbi mattis, orci eget rhoncus dapibus, sapien dui commodo dui, eu pharetra erat ex sit amet neque. Praesent hendrerit eu metus quis tristique.",
    postAuthor: "David",
  },
  {
    id: 3,
    postTitle: "Post 3",
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie, est vel fermentum vestibulum, lorem dui lobortis metus, a consequat lacus mi vitae sem. Fusce varius rutrum sem. Nullam sed dictum elit. Nulla vel tempor magna. Pellentesque ultricies justo a dui suscipit, in euismod ligula pharetra. Aenean arcu ante, consectetur condimentum enim at, pretium dictum justo. Suspendisse ut lorem id purus ultrices tincidunt ut et lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sed suscipit nibh. Morbi mattis, orci eget rhoncus dapibus, sapien dui commodo dui, eu pharetra erat ex sit amet neque. Praesent hendrerit eu metus quis tristique.",
    postAuthor: "xQc",
  },
];
