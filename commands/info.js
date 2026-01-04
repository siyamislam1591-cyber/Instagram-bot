module.exports = {
  name: "info",
  run: async ({ ig, userId, config }) => {
    if (!config.ADMINS.includes(userId.toString())) {
      return ig.entity
        .directThread(userId.toString())
        .broadcastText("⛔ Admin only command");
    }

    await ig.entity
      .directThread(userId.toString())
      .broadcastText("🤖 Bot is running perfectly");
  }
};
