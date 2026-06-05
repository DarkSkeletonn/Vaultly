const express = require("express");

const router = express.Router();

const {
    createTask,
    getAllTasks
} = require("../database/taskRepository");

router.get("/", (req, res) => {

    const tasks = getAllTasks();

    res.json(tasks);

});

router.post("/", (req, res) => {

    const {
        title,
        deadline,
        memoryId
    } = req.body;

    const id = createTask(
        title,
        deadline,
        memoryId
    );

    res.status(201).json({
        message: "Task created",
        id
    });

});

module.exports = router;