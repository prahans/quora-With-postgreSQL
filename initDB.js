const pool = require("./db");

const deleteQuery = "DELETE FROM posts";

const insertQuery = `
  INSERT INTO posts (username, content)
  VALUES
    ('John Romero', 'You might not think that programmers are artists, but programming is an extremely creative profession. Its logic-based creativity.'),
    ('Grace Hopper', 'The most dangerous phrase in the language is, We have always done it this way.'),
    ('Burt Rutan', 'Testing leads to failure, and failure leads to understanding.'),
    ('Patrick McKenzie', 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it')
`;

async function initDB() {
  try {
    await pool.query(deleteQuery);
    console.log("All posts data deleted");

    await pool.query(insertQuery);
    console.log("Sample data inserted");
  } catch (err) {
    console.error("Error initializing DB:", err);
  } finally {
    await pool.end(); // always close connection
  }
}

initDB();
