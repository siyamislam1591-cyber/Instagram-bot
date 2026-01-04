const commandHandler = require("../handlers/commandHandler");
const replyHandler = require("../handlers/replyHandler");

async function startListener(ig) {
  console.log("🤖 nx is here..");

  setInterval(async () => {
    const inbox = await ig.feed.directInbox().items();

    for (const thread of inbox) {
      const msg = thread.items?.[0];
      if (!msg || msg.item_type !== "text") continue;

      const text = msg.text;
      const userId = thread.users[0].pk.toString();

      if (text.startsWith("/")) {
        await commandHandler(ig, text, userId);
      } else {
        const reply = replyHandler(text);
        if (reply) {
          await ig.entity
            .directThread(userId)
            .broadcastText(reply);
        }
      }
    }
  }, 5000);
}

module.exports = startListener;
