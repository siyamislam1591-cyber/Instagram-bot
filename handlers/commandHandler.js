const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = async (ig, text, userId) => {
  if (!text.startsWith(config.PREFIX)) return;

  const args = text
    .slice(config.PREFIX.length)
    .trim()
    .split(" ");

  const cmdName = args.shift().toLowerCase();
  const cmdPath = path.join(
    __dirname,
    "..",
    "commands",
    `${cmdName}.js`
  );

  if (!fs.existsSync(cmdPath)) return;

  const command = require(cmdPath);
  await command.run({ ig, userId, args, config });
};
