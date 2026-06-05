const express = require("express");

const router = express.Router();

const {
    createMemory,
    getAllMemories,
    getMemoryById,
    updateMemory,
    deleteMemory
} = require("../database/memoryRepository");

router.get("/", (req, res) => {

    const memories = getAllMemories();

    res.json(memories);

});

router.post("/", (req, res) => {

    const {
        title,
        content,
        sourceType
    } = req.body;

    const id = createMemory(
        title,
        content,
        sourceType
    );

    res.status(201).json({
        message: "Memory created",
        id
    });

});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const memory = getMemoryById(id);

    if (!memory) {
        return res.status(404).json({
            message: "Memory not found"
        });
    }

    res.json(memory);

});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const {
        title,
        content
    } = req.body;

    updateMemory(
        id,
        title,
        content
    );

    res.json({
        message: "Memory updated"
    });

});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    deleteMemory(id);

    res.json({
        message: "Memory deleted"
    });

});

module.exports = router;