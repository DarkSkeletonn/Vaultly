const {
  parseInstagram
} = require("./parsers/instagramParser");

const {
  parsePinterest
} = require("./parsers/pinterestParser");

const {
  parseReddit
} = require("./parsers/redditParser");

const {
  parseYouTube
} = require("./parsers/youtubeParser");

function parseShare(source, sharedText) {

  switch (source) {

    case "Instagram":
      return parseInstagram(sharedText);

    case "Pinterest":
      return parsePinterest(sharedText);

    case "Reddit":
        return parseReddit(sharedText);

    case "YouTube":
        return parseYouTube(sharedText);

    default:

      return {
        title: "Shared Content",
        content: sharedText,
        type: "link"
      };
  }
}

module.exports = {
  parseShare
};