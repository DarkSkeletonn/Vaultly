const db = require("./connection");

function createFolder(name) {
  const stmt = db.prepare(`
    INSERT INTO folders(name)
    VALUES(?)
  `);

  return stmt.run(name);
}

function getAllFolders() {
  return db.prepare(`
    SELECT *
    FROM folders
  `).all();
}

module.exports = {
  createFolder,
  getAllFolders
};