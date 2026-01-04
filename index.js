/**
 * Instagram Bot Launcher for Render
 * Author: Siyam Rohman
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js"); // Optional logger, use console.log if not available
const express = require("express");
const app = express();

// 🔹 Fake web server for Render
app.get("/", (req, res) => {
  res.send("Instagram Bot is running on Render Web Service!");
});

// Render requires a running web server
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Web service running on port:", process.env.PORT || 3000);
});

// 🔹 Function to start the Instagram bot
function startBot() {
  const child = spawn("node", ["GoatIG.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (code) => {
    if (code === 2) {
      log?.info("🔁 Restarting Instagram Bot...");
      startBot();
    } else {
      log?.info(`Instagram Bot exited with code ${code}`);
    }
  });

  child.on("error", (err) => {
    log?.error("❌ Failed to start Instagram Bot:", err);
    // Retry after 5 seconds
    setTimeout(startBot, 5000);
  });
}

// Start the bot
startBot();
