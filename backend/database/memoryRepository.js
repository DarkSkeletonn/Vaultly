const db = require("./connection");

function createMemory(title, content, sourceType) {

    const stmt = db.prepare(`
        INSERT INTO memories(
            title,
            content,
            source_type
        )
        VALUES (?, ?, ?)
    `);

    const result = stmt.run(
        title,
        content,
        sourceType
    );

    return result.lastInsertRowid;
}

function getAllMemories() {

    const stmt = db.prepare(`
        SELECT * FROM memories
    `);

    return stmt.all();
}

function getMemoryById(id) {

    const stmt = db.prepare(`
        SELECT * FROM memories
        WHERE id = ?
    `);

    return stmt.get(id);
}

function deleteMemory(id) {

    const stmt = db.prepare(`
        DELETE FROM memories
        WHERE id = ?
    `);

    return stmt.run(id);
}

function updateMemory(id, title, content) {

    const stmt = db.prepare(`
        UPDATE memories
        SET
            title = ?,
            content = ?
        WHERE id = ?
    `);

    return stmt.run(
        title,
        content,
        id
    );
}

module.exports = {
    createMemory,
    getAllMemories,
    getMemoryById,
    updateMemory,
    deleteMemory
};