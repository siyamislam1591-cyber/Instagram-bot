module.exports = {
  run: async ({ ig, userId }) => {
    await ig.entity
      .directThread(userId)
      .broadcastText(
        "🤖 Commands:\n/ping\n/help\n/info"
      );
  }
};
