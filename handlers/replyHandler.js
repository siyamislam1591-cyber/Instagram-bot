const replies = require("../data/replies.json");

module.exports = (text) => {
  text = text.toLowerCase();
  for (const key in replies) {
    if (text.includes(key)) {
      return replies[key];
    }
  }
  return null;
};
