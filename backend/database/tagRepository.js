const db = require("./connection");

function createTag(itemId, tag) {
  const stmt = db.prepare(`
    INSERT INTO tags (
      item_id,
      tag
    )
    VALUES (?, ?)
  `);

  return stmt.run(itemId, tag);
}

function getTagsByItem(itemId) {
  const stmt = db.prepare(`
    SELECT *
    FROM tags
    WHERE item_id = ?
  `);

  return stmt.all(itemId);
}

module.exports = {
  createTag,
  getTagsByItem
};