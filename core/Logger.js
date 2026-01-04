/**
 * Simple Logger for Instagram Bot
 * You can use log.info(), log.error(), log.warn()
 */

const chalk = require("chalk"); // Optional, for colored console logs

const log = {
  info: (message) => {
    console.log(chalk.blue("[INFO]"), message);
  },

  warn: (message) => {
    console.warn(chalk.yellow("[WARN]"), message);
  },

  error: (message) => {
    console.error(chalk.red("[ERROR]"), message);
  },

  debug: (message) => {
    console.log(chalk.gray("[DEBUG]"), message);
  },
};

module.exports = log;
