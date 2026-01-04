module.exports = async (ig) => {
  try {
    // Fetch inbox threads
    const inboxFeed = ig.feed.directInbox();
    const threads = await inboxFeed.items();

    for (const thread of threads) {
      // Ignore if already seen
      if (thread.seen) continue;

      // Get user info
      const user = thread.users[0];
      const username = user.username;
      const threadId = thread.thread_id;

      // Get last message
      const lastMessage = thread.last_permanent_item?.text || "";

      console.log(`📩 New DM from @${username}: ${lastMessage}`);

      // Example auto-reply logic
      // You can customize this
      let replyText = "";

      if (lastMessage.toLowerCase().includes("hello")) {
        replyText = `Hello @${username}! 🤖 How are you?`;
      } else if (lastMessage.toLowerCase().includes("hi")) {
        replyText = `Hi @${username}! 👋`;
      } else {
        replyText = `Thanks for your message @${username}! 💬`;
      }

      // Send reply
      await ig.directThread(threadId).broadcastText(replyText);
      console.log(`✅ Replied to @${username}`);

      // Optional: mark thread as seen
      thread.seen = true;
    }
  } catch (err) {
    console.error("❌ DM Handler Error:", err.message);
  }
};
