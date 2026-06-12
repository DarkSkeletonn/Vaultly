function parseYouTube(sharedText) {

  const urlMatch =
    sharedText.match(/https?:\/\/\S+/);

  const url =
    urlMatch
      ? urlMatch[0]
      : sharedText;

  return {
    title: "YouTube Video",
    content: url,
    type: "video"
  };
}

module.exports = {
  parseYouTube
};