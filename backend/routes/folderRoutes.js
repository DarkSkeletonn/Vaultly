const express = require("express");
const router = express.Router();

const {
  createFolder,
  getAllFolders
} = require("../database/folderRepository");

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

module.exports = router;