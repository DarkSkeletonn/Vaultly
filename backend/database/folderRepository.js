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

function getFolderStats() {
  return db.prepare(`
    SELECT
      folders.id,
      folders.name,
      COUNT(items.id) AS count
    FROM folders
    LEFT JOIN items
      ON folders.id = items.folder_id
    GROUP BY folders.id, folders.name
    ORDER BY folders.id
  `).all();
}

module.exports = {
  createFolder,
  getAllFolders,
  getFolderStats
};