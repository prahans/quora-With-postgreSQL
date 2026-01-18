const pool = require("./db");

const deleteQuery = "DELETE FROM posts";

const insertQuery = `
INSERT INTO posts (username, content)
VALUES
('John Romero', 'Programming is a creative process where a developer uses logic and imagination to build systems that solve real world problems.'),

('Grace Hopper', 'Learning to code teaches you how to think clearly, break big problems into small parts, and design better solutions.'),

('Burt Rutan', 'Failure in software development is not the end. Every bug teaches a lesson that helps improve the system.'),

('Patrick McKenzie', 'Every great developer starts by solving problems they do not fully understand, learning step by step through experience.'),

('Linus Torvalds', 'Good code is not written quickly. It is built carefully by developers who understand systems and long term design.'),

('Dennis Ritchie', 'The best way to learn programming is by writing code, making mistakes, and fixing bugs repeatedly.'),

('Ken Thompson', 'Complex systems fail when developers forget simplicity. Simple logic leads to reliable software.'),

('Robert C. Martin', 'Clean code is a reflection of a developers mindset. If you care about design, your code will show it.'),

('John Romero', 'A developer must think like an artist and an engineer at the same time to build powerful software.'),

('Grace Hopper', 'The most dangerous bug is the one hidden inside assumptions. Question your logic often.'),

('Patrick McKenzie', 'Building software is about understanding users, not just writing code that works.'),

('Linus Torvalds', 'Bad design creates problems that no amount of code can fix later.'),

('Dennis Ritchie', 'Programming languages shape how developers think and solve problems.'),

('Ken Thompson', 'Sometimes deleting code improves a system more than adding new features.'),

('Robert C. Martin', 'Code should be readable like a well written book, not a puzzle.'),

('John Romero', 'Every developer improves by debugging systems that once confused them.'),

('Grace Hopper', 'Innovation happens when developers challenge old systems and build better ones.'),

('Burt Rutan', 'Testing software exposes weak logic and helps developers understand failure.'),

('Patrick McKenzie', 'A good system is built gradually through small improvements, not big jumps.'),

('Linus Torvalds', 'Software design matters more than clever tricks inside the code.'),

('Dennis Ritchie', 'Understanding memory, data, and logic makes you a better programmer.'),

('Ken Thompson', 'When logic becomes complicated, bugs hide easily inside the system.'),

('Robert C. Martin', 'Developers should write code for humans first, machines second.'),

('John Romero', 'Games taught me that performance, logic, and creativity must work together.'),

('Grace Hopper', 'Debugging is simply the process of finding and correcting flawed logic.'),

('Patrick McKenzie', 'Developers grow faster when they read code written by others.'),

('Linus Torvalds', 'Good tools help developers focus on solving real problems.'),

('Dennis Ritchie', 'The simplest solution is often the most reliable design.'),

('Ken Thompson', 'Systems should evolve naturally instead of being over engineered.'),

('Robert C. Martin', 'A developer who ignores clean code will eventually fight their own system.'),

('John Romero', 'Every line of code should have a clear purpose in the system.'),

('Grace Hopper', 'The future belongs to developers who understand both logic and people.'),

('Patrick McKenzie', 'Real world problems rarely fit perfectly into clean code structures.'),

('Linus Torvalds', 'Open source teaches developers how large systems actually work.'),

('Dennis Ritchie', 'Programming rewards patience, logic, and continuous learning.'),

('Ken Thompson', 'A small bug can crash a large system if ignored.'),

('Robert C. Martin', 'Design patterns exist to solve problems developers face repeatedly.'),

('John Romero', 'Great software feels simple because the developer handled the complexity.'),

('Grace Hopper', 'Developers should never stop questioning how systems can improve.'),

('Patrick McKenzie', 'Writing maintainable code saves time, money, and developer sanity.'),

('Linus Torvalds', 'Performance problems often come from poor system design.'),

('Dennis Ritchie', 'Programming is thinking made visible through code.'),

('Ken Thompson', 'Code that is easy to read is easy to debug.'),

('Robert C. Martin', 'Developers should refactor code before problems grow too large.'),

('John Romero', 'A strong foundation in logic makes learning new technologies easier.'),

('Grace Hopper', 'The best developers are lifelong learners.'),

('Patrick McKenzie', 'Software development is a long journey of solving problems and learning continuously.'),

('Linus Torvalds', 'Code quality matters more as a system grows.'),

('Dennis Ritchie', 'Understanding fundamentals makes complex systems manageable.'),

('Ken Thompson', 'Good design reduces bugs before code is written.'),

('Robert C. Martin', 'Clean architecture helps developers build systems that last.')
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
