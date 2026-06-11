function generateTags(text) {

  if (!text) {
    return [];
  }

  return [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2)
    )
  ];

}

module.exports = {
  generateTags
};