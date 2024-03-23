import axios from "axios";
import ejs from "ejs";
import express from "express";

const APP = express();
const PORT = 3000;
const API_URL = "http://localhost:4000";

APP.use(express.urlencoded({ extended: true }));
APP.use(express.static("public"));
APP.use(express.json());

APP.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    const data = response.data;

    res.render("index.ejs", {
      posts: data,
    });
  } catch (e) {
    console.log(e);
  }
});

APP.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/delete/${req.params.id}`);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

APP.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    const data = response.data;
    res.render("edit.ejs", {
      post: data,
    });
  } catch (e) {
    console.log(e);
  }
});

APP.post("/edit/:id", async (req, res) => {
  try {
    await axios.patch(`${API_URL}/edit/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

APP.get("/new", (req, res) => {
  res.render("new.ejs");
});

APP.post("/new", async (req, res) => {
  try {
    await axios.post(`${API_URL}/new`, req.body);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

APP.listen(PORT, () => {
  console.log("Website Starting...");
});
