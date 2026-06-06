const express = require("express");
const router = express.Router();

const {
  createTag,
  getTagsByItem
} = require("../database/tagRepository");

router.post("/", (req, res) => {

  const { itemId, tag } = req.body;

  createTag(itemId, tag);

  res.status(201).json({
    message: "Tag added"
  });

});

router.get("/:itemId", (req, res) => {

  const tags = getTagsByItem(
    req.params.itemId
  );

  res.json(tags);

});

module.exports = router;