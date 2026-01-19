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

function highlight(text, q) {
  if (!q) return text;
  return text.split(q).join(`<mark>${q}</mark>`);
}
app.get("/posts", async (req, res) => {
  try {
    let q = req.query.q;
    const postCount = await quora.query("SELECT COUNT(*) FROM posts");
    const totalPost = postCount.rows[0].count;
    if (!q) {
      const result = await quora.query(`SELECT *,
  CASE
    WHEN NOW() - created_at < INTERVAL '1 minute'
      THEN 'just now'

    WHEN NOW() - created_at < INTERVAL '1 hour'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 60) || ' min ago'

    WHEN NOW() - created_at < INTERVAL '1 day'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600) || ' hr ago'

    WHEN NOW() - created_at < INTERVAL '1 month'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 86400) || ' days ago'

    WHEN NOW() - created_at < INTERVAL '1 year'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 2592000) || ' months ago'

    ELSE
      FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 31536000) || ' years ago'
  END AS time_ago
FROM posts
ORDER BY created_at DESC;
`);

      res.render("index.ejs", { posts: result.rows, totalPost });
    } else {
      const result = await quora.query(
        `SELECT *,
        CASE
    WHEN NOW() - created_at < INTERVAL '1 minute'
      THEN 'just now'

    WHEN NOW() - created_at < INTERVAL '1 hour'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 60) || ' min ago'

    WHEN NOW() - created_at < INTERVAL '1 day'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600) || ' hr ago'

    WHEN NOW() - created_at < INTERVAL '1 month'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 86400) || ' days ago'

    WHEN NOW() - created_at < INTERVAL '1 year'
      THEN FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 2592000) || ' months ago'

    ELSE
      FLOOR(EXTRACT(EPOCH FROM (NOW() - created_at)) / 31536000) || ' years ago'
  END AS time_ago
         FROM posts 
         WHERE username ILIKE '%${q}%' 
            OR content ILIKE '%${q}%'`,
      );

      const posts = result.rows.map((post) => ({
        ...post,
        username: highlight(post.username, q),
        content: highlight(post.content, q),
      }));
      let totalPost = await quora.query(
        `SELECT COUNT(*) FROM posts 
         WHERE username ILIKE '%${q}%' 
            OR content ILIKE '%${q}%'`,
      );
      totalPost = totalPost.rows[0].count;

      res.render("index.ejs", { posts, totalPost });
    }
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
