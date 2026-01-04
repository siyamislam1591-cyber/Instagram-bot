module.exports = {
  run: async ({ ig, userId }) => {
    await ig.entity
      .directThread(userId)
      .broadcastText("🏓 Pong!");
  }
};
