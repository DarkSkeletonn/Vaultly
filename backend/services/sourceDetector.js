function detectSource(sharedText) {

  const text = sharedText.toLowerCase();

  if (text.includes("instagram")) {
    return {
      source: "Instagram",
      folderName: "Instagram"
    };
  }

  if (
    text.includes("pinterest.com") ||
    text.includes("pin.it")
    ) {
    return {
        source: "Pinterest",
        folderName: "Pinterest"
    };
  }

  if (
    text.includes("reddit.com") ||
    text.includes("reddit")
    ) {
    return {
        source: "Reddit",
        folderName: "Reddit"
    };
    }

    if (
    text.includes("youtube.com") ||
    text.includes("youtu.be")
    ) {
    return {
        source: "YouTube",
        folderName: "YouTube"
    };
    }

  return {
    source: "Unknown",
    folderName: "Documents"
  };
}

module.exports = {
  detectSource
};