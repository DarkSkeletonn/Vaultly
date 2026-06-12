function parseReddit(sharedText) {

  const urlMatch =
    sharedText.match(/https?:\/\/\S+/);

  const url =
    urlMatch
      ? urlMatch[0]
      : sharedText;

  return {
    title: "Reddit Post",
    content: url,
    type: "post"
  };
}

module.exports = {
  parseReddit
};