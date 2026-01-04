const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = async (ig, text, userId) => {
  if (!text.startsWith(config.PREFIX)) return;

  const args = text
    .slice(config.PREFIX.length)
    .trim()
    .split(" ");

  const cmd = args.shift().toLowerCase();
  const cmdFile = path.join(
    __dirname,
    "..",
    "commands",
    `${cmd}.js`
  );

  if (!fs.existsSync(cmdFile)) return;

  const command = require(cmdFile);
  await command.run({ ig, userId, args, config });
};
