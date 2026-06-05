const db = require("./connection");

function createTask(title, deadline, memoryId) {

    const stmt = db.prepare(`
        INSERT INTO tasks(
            title,
            deadline,
            memory_id
        )
        VALUES (?, ?, ?)
    `);

    const result = stmt.run(
        title,
        deadline,
        memoryId
    );

    return result.lastInsertRowid;
}

function getAllTasks() {

    const stmt = db.prepare(`
        SELECT * FROM tasks
    `);

    return stmt.all();
}

function getTaskById(id) {

    const stmt = db.prepare(`
        SELECT * FROM tasks
        WHERE id = ?
    `);

    return stmt.get(id);
}

function updateTaskStatus(id, status) {

    const stmt = db.prepare(`
        UPDATE tasks
        SET status = ?
        WHERE id = ?
    `);

    return stmt.run(
        status,
        id
    );
}

function deleteTask(id) {

    const stmt = db.prepare(`
        DELETE FROM tasks
        WHERE id = ?
    `);

    return stmt.run(id);
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskStatus,
    deleteTask
};