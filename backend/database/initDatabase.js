const db = require("./connection");

db.prepare(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    path TEXT UNIQUE,
    folder_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("Items table created!");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    tag TEXT NOT NULL
  )
`).run();

console.log("Tags table created!");

db.prepare(`
  CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("Folders table created!");

db.prepare(`
  INSERT OR IGNORE INTO folders(name)
  VALUES ('Photos')
`).run();

db.prepare(`
  INSERT OR IGNORE INTO folders(name)
  VALUES ('Videos')
`).run();

db.prepare(`
  INSERT OR IGNORE INTO folders(name)
  VALUES ('Documents')
`).run();

db.prepare(`
  INSERT OR IGNORE INTO folders(name)
  VALUES ('Instagram')
`).run();

db.prepare(`
  INSERT OR IGNORE INTO folders(name)
  VALUES ('Pinterest')
`).run();

console.log("Default folders seeded!");