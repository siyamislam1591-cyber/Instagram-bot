const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = async (ig, text, userId) => {
  try {
    // 1️⃣ Check prefix
    if (!text.startsWith(config.BOT.PREFIX)) return;

    // 2️⃣ Parse command and arguments
    const args = text
      .slice(config.BOT.PREFIX.length)
      .trim()
      .split(/\s+/); // Split by spaces
    const cmdName = args.shift().toLowerCase();

    // 3️⃣ Build command path
    const cmdPath = path.join(__dirname, "..", "commands", `${cmdName}.js`);
    if (!fs.existsSync(cmdPath)) return;

    // 4️⃣ Clear Node cache for hot reload
    delete require.cache[require.resolve(cmdPath)];

    // 5️⃣ Require the command
    const command = require(cmdPath);

    // 6️⃣ Check if run function exists
    if (!command || typeof command.run !== "function") return;

    // 7️⃣ Execute command safely
    await command.run({ ig, userId, args, config });

  } catch (err) {
    console.error(`[COMMAND HANDLER ERROR]:`, err);
  }
};
