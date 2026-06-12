function parseInstagram(sharedText) {

  let title = "Instagram Reel";

  const usernameMatch =
    sharedText.match(/@([a-zA-Z0-9._]+)/);

  if (usernameMatch) {
    title = usernameMatch[1];
  }

  const urlMatch =
    sharedText.match(/https?:\/\/\S+/);

  const url =
    urlMatch
      ? urlMatch[0]
      : sharedText;

  return {
    title,
    content: url,
    type: sharedText.toLowerCase().includes("reel")
      ? "reel"
      : "post"
  };
}

module.exports = {
  parseInstagram
};