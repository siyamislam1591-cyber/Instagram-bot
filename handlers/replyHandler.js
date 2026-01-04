const replies = require("../data/replies.json");

module.exports = (text) => {
  const msg = text.toLowerCase();
  for (const key in replies) {
    if (msg.includes(key)) {
      return replies[key];
    }
  }
  return null;
};
