const commandHandler = require("../handlers/commandHandler");
const replyHandler = require("../handlers/replyHandler");

async function startListener(ig) {
  console.log("🤖 Siyuu is here.."); // siyuuu your father 

  // Polling interval for inbox
  setInterval(async () => {
    try {
      // Fetch direct inbox threads
      const inbox = await ig.feed.directInbox().items();

      for (const thread of inbox) {
        const msg = thread.items?.[0];
        if (!msg || msg.item_type !== "text") continue;

        const text = msg.text;
        const userId = thread.users?.[0]?.pk?.toString();
        if (!userId) continue;

        // Command check
        if (text.startsWith("/")) {
          await commandHandler(ig, text, userId);
        } else {
          // Auto reply
          const reply = replyHandler(text);
          if (reply) {
            try {
              await ig.entity.directThread(userId).broadcastText(reply);
            } catch (err) {
              console.error("[REPLY ERROR]:", err);
            }
          }
        }
      }
    } catch (err) {
      console.error("[INBOX FETCH ERROR]:", err);
    }
  }, 5000); // 5 second interval
}

module.exports = startListener;
