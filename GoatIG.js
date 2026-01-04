/**
 * GoatIG.js - Main Instagram Bot
 * Author: Siyam Rohman
 */

const Instagramlogin = require("./core/Instagramlogin");
const config = require("./config");
const dmHandler = require("./handlers/dmHandler");
const commentHandler = require("./handlers/commentHandler");
const initErrorHandler = require("./core/errorHandler");
const log = require("./core/logger");

// Initialize global error handler
initErrorHandler();

(async () => {
  try {
    log.info("🤖 Starting Instagram Bot...");

    // Login to Instagram
    const ig = await Instagramlogin(config.IG_USERNAME, config.IG_PASSWORD);
    log.info("✅ Bot logged in as: " + config.IG_USERNAME);

    // DM handler interval
    setInterval(() => {
      dmHandler(ig).catch(err => log.error("DM Handler Error: " + err.message));
    }, 10000); // Every 10 seconds

    // Comment handler interval
    setInterval(() => {
      commentHandler(ig).catch(err => log.error("Comment Handler Error: " + err.message));
    }, 15000); // Every 15 seconds

    log.info("🚀 DM and Comment handlers started");

  } catch (err) {
    log.error("❌ GoatIG.js Error: " + err.message);
  }
})();
