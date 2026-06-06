const db = require("./connection");

function createItem(title, source, type, content) {
  const stmt = db.prepare(`
    INSERT INTO items (
      title,
      source,
      type,
      content
    )
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    title,
    source,
    type,
    content
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

module.exports = {
  createItem,
  getAllItems,
  searchItems,
  deleteItem,
  updateItem
};