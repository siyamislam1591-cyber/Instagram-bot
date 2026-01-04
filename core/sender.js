module.exports = async (ig, userId, text) => {
  await ig.entity
    .directThread(userId.toString())
    .broadcastText(text);
};
