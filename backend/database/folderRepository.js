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

function getFolderByName(name) {
  return db.prepare(`
    SELECT *
    FROM folders
    WHERE name = ?
  `).get(name);
}

function getOrCreateFolder(name) {

  const existingFolder =
    getFolderByName(name);

  if (existingFolder) {
    return existingFolder.id;
  }

  const result =
    createFolder(name);

  return result.lastInsertRowid;
}

module.exports = {
  createFolder,
  getAllFolders,
  getFolderStats,
  getFolderByName,
  getOrCreateFolder
};