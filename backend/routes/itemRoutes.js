const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  searchItems,
  deleteItem,
  updateItem,
  updateContentByPath,
  itemExists
} = require("../database/itemRepository");

const {
  getOrCreateFolder
} = require("../database/folderRepository");

const {
  detectSource
} = require("../services/sourceDetector");

const {
  parseShare
} = require("../services/shareParser");

router.post("/", (req, res) => {

  const {
    title,
    source,
    type,
    content,
    folderId
  } = req.body;

  const id = createItem(
    title,
    source,
    type,
    content,
    null,
    folderId
  );

  res.status(201).json({
    id,
    message: "Item Saved Successfully"
  });

});

router.get("/", (req, res) => {

  const items = getAllItems();

  res.json(items);

});

router.get("/search", (req, res) => {

  const query = req.query.q;

  const results = searchItems(query);

  res.json(results);

});

router.delete("/:id", (req, res) => {

  const id = req.params.id;

  const result = deleteItem(id);

  if(result.changes === 0) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  res.json({
    message: "Item deleted successfully"
  });

});

router.put("/:id", (req, res) => {

  const { title, source, type, content } = req.body;

  const result = updateItem(
    req.params.id,
    title,
    source,
    type,
    content
  );

  res.json({
    message: "Item updated"
  });

});

router.post("/share", (req, res) => {

  const { sharedText } = req.body;

  const detected =
    detectSource(sharedText);

  const source =
    detected.source;

  const folderName =
    detected.folderName;

  const parsed =
    parseShare(
      source,
      sharedText
    );

  const title =
    parsed.title;

  const url =
    parsed.content;

  const type =
    parsed.type;

  const existingItem =
    itemExists(url);

  if (existingItem) {
    return res.json({
      message: "Already saved"
    });
  }

  const folderId =
  getOrCreateFolder(folderName);

  const id = createItem(
    title,
    source,
    type,
    url,
    null,
    folderId
  );

  res.status(201).json({
    id,
    source,
    type,
    folderId,
    message: "Shared item saved"
  });

});

router.post("/index", (req, res) => {

  const {
    title,
    path,
    type,
    content,
    folderId
  } = req.body;

  const id = createItem(
    title,
    "Gallery",
    type,
    content || "",
    path,
    folderId
  );

  if (content) {
    updateContentByPath(
      path,
      content
    );
  }

  res.status(201).json({
    id,
    message: "Indexed successfully"
  });

});

module.exports = router;