const fs = require("fs");
const path = require("path");

// JSON ফাইল safe load
let replies = {};
const repliesPath = path.join(__dirname, "../data/replies.json");

if (fs.existsSync(repliesPath)) {
  try {
    replies = JSON.parse(fs.readFileSync(repliesPath, "utf-8"));
  } catch (err) {
    console.error("[REPLY HANDLER ERROR] Failed to parse replies.json:", err);
  }
} else {
  console.warn("[REPLY HANDLER WARNING] replies.json not found!");
}

/**
 * replyHandler
 * @param {string} text - Incoming message
 * @returns {string|null} - Reply message if matched, otherwise null
 */
module.exports = (text) => {
  if (!text || typeof text !== "string") return null;

  const msg = text.toLowerCase().trim();

  // Exact match preferred
  if (replies[msg]) return replies[msg];

  // Partial match (includes)
  for (const key in replies) {
    if (msg.includes(key.toLowerCase())) {
      return replies[key];
    }
  }

  return null;
};
