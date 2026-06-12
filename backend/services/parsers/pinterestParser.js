function parsePinterest(sharedText) {

  const urlMatch =
    sharedText.match(/https?:\/\/\S+/);

  const url =
    urlMatch
      ? urlMatch[0]
      : sharedText;

  return {
    title: "Pinterest Pin",
    content: url,
    type: "pin"
  };
}

module.exports = {
  parsePinterest
};