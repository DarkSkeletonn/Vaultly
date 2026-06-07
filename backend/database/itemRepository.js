const db = require("./connection");

function createItem(
  title,
  source,
  type,
  content,
  path,
  folderId
) {

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO items (
      title,
      source,
      type,
      content,
      path,
      folder_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    title,
    source,
    type,
    content,
    path,
    folderId
  );

  return result.lastInsertRowid;
}

function getAllItems() {
  const stmt = db.prepare(`
    SELECT *
    FROM items
    ORDER BY created_at DESC
  `);

  return stmt.all();
}

function searchItems(query) {

  const stmt = db.prepare(`
    SELECT *
    FROM items
    WHERE
      title LIKE ?
      OR content LIKE ?
      OR source LIKE ?
    ORDER BY created_at DESC
  `);

  return stmt.all(
    `%${query}%`,
    `%${query}%`,
    `%${query}%`
  );
}

function deleteItem(id) {

  const stmt = db.prepare(`
    DELETE FROM items
    WHERE id = ?
  `);

  return stmt.run(id);
}

function updateItem(id, title, source, type, content) {
  const stmt = db.prepare(`
    UPDATE items
    SET
      title = ?,
      source = ?,
      type = ?,
      content = ?
    WHERE id = ?
  `);

  return stmt.run(
    title,
    source,
    type,
    content,
    id
  );
}

function getItemsByFolder(folderId) {

  const stmt = db.prepare(`
    SELECT *
    FROM items
    WHERE folder_id = ?
    ORDER BY created_at DESC
  `);

  return stmt.all(folderId);
}

module.exports = {
  createItem,
  getAllItems,
  searchItems,
  deleteItem,
  updateItem,
  getItemsByFolder
};