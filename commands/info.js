module.exports = {
  run: async ({ ig, userId, config }) => {
    if (!config.ADMINS.includes(userId)) {
      return ig.entity
        .directThread(userId)
        .broadcastText("⛔ Admin only");
    }

    await ig.entity
      .directThread(userId)
      .broadcastText("✅ Bot is running fine");
  }
};
