const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const quora = require("./db");
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("hi i am root");
});

app.get("/posts", async (req, res) => {
  try {
    const result = await quora.query("SELECT * FROM posts");
    res.render("index.ejs", { posts: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", async (req, res) => {
  try {
    let { username, content } = req.body;
    await quora.query(
      `INSERT INTO posts(username, content) VALUES ('${username}', '${content}')`,
    );
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await quora.query(`SELECT * FROM posts WHERE post_id = ${id}`);
    res.render("show.ejs", { post: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

app.get("/posts/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await quora.query(`SELECT * FROM posts WHERE post_id = ${id}`);
    res.render("edit.ejs", { post: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    let { id } = req.params;
    quora.query(
      `UPDATE posts SET content = '${req.body.content}' WHERE post_id = ${id}`,
    );
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

//DELETE FROM table_name WHERE condition;
app.delete("/posts/:id", async (req, res) => {
  try {
    let { id } = req.params;
    quora.query(`DELETE FROM posts WHERE post_id = ${id}`);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
