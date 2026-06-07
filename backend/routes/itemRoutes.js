const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  searchItems,
  deleteItem,
  updateItem
} = require("../database/itemRepository");

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

  let source = "Unknown";
  let type = "link";
  let folderId = 3; // Documents default

  if(sharedText.includes("instagram")) {
    source = "Instagram";
    folderId = 4;
  }

  if(sharedText.includes("reel")) {
    type = "reel";
  }

  if(sharedText.includes("pinterest")) {
    source = "Pinterest";
    type = "pin";
    folderId = 5;
  }

  const id = createItem(
    "Shared Content",
    source,
    type,
    sharedText,
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
    folderId
  } = req.body;

  const id = createItem(
    title,
    "Gallery",
    type,
    "",
    path,
    folderId
  );

  res.status(201).json({
    id,
    message: "Indexed successfully"
  });

});

module.exports = router;