const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "Siyam Rohman",
    description: "Change the bot command prefix globally or per chat (admin-only for global)",
    category: "config",
    guide: {
      en:
        "  {pn} <new prefix>: change prefix for this chat\n" +
        "  Example:\n    {pn} #\n\n" +
        "  {pn} <new prefix> -g: change global prefix (admin-only)\n" +
        "  Example:\n    {pn} # -g\n\n" +
        "  {pn} reset: reset prefix for this chat to default"
    }
  },

  langs: {
    en: {
      reset: "✅ Your prefix has been reset to default: %1",
      onlyAdmin: "❌ Only bot admins can change the global prefix",
      confirmGlobal: "⚠️ React to this message to confirm global prefix change",
      confirmThisChat: "⚠️ React to this message to confirm prefix change for this chat",
      successGlobal: "✅ Global prefix changed to: %1",
      successThisChat: "✅ Prefix for this chat changed to: %1",
      myPrefix: "👋 Hey %1!\n➥ 🌐 Global: %2\n➥ 💬 This Chat: %3\nBot: %4"
    }
  },

  // On command execution
  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.reply("❌ Please provide a new prefix or 'reset'");

    if (args[0].toLowerCase() === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.Bot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = { commandName, author: event.senderID, newPrefix };

    if (args[1] === "-g") {
      if (role < 2) return message.reply(getLang("onlyAdmin"));
      formSet.setGlobal = true;
    } else {
      formSet.setGlobal = false;
    }

    return message.reply(
      args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisChat"),
      (err, info) => {
        formSet.messageID = info.messageID;
        global.Bot.onReaction.set(info.messageID, formSet);
      }
    );
  },

  // On reaction to confirmation message
  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.Bot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.Bot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisChat", newPrefix));
    }
  },

  // On chat command "prefix"
  onChat: async function ({ event, message, getLang, usersData }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      const userName = await usersData.getName(event.senderID);
      const botName = global.Bot.config.nickNameBot || "Bot";
      return message.reply(
        getLang(
          "myPrefix",
          userName,
          global.Bot.config.prefix,
          utils.getPrefix(event.threadID),
          botName
        )
      );
    }
  }
};
