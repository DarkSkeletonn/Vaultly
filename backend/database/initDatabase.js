const db = require("./connection");

db.prepare(`
    CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        source_type TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log("Memories table created!");

db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        deadline TEXT,
        status TEXT DEFAULT 'pending',
        memory_id INTEGER
    )
`).run();

console.log("Tasks table created!");