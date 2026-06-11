const express = require("express");
const router = express.Router();

const {
  createFolder,
  getAllFolders,
  getFolderStats
} = require("../database/folderRepository");

const {
  getItemsByFolder
} = require("../database/itemRepository");

router.post("/", (req, res) => {

  const { name } = req.body;

  createFolder(name);

  res.status(201).json({
    message: "Folder created"
  });

});

router.get("/", (req, res) => {

  const folders = getAllFolders();

  res.json(folders);

});

router.get("/stats", (req, res) => {

  const stats = getFolderStats();

  res.json(stats);

});

router.get("/:id/items", (req, res) => {

  const folderId = req.params.id;

  const items = getItemsByFolder(folderId);

  res.json(items);

});

module.exports = router;