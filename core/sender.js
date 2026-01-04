/**
 * Send a direct message to a user
 * @param {IgApiClient} ig - Instagram client instance
 * @param {string|number} userId - Recipient Instagram user ID
 * @param {string} text - Message text
 */
module.exports = async (ig, userId, text) => {
  try {
    if (!ig || !userId || !text) return;

    // Ensure userId is string
    const id = userId.toString();

    await ig.entity.directThread(id).broadcastText(text);

    console.log(`📩 Message sent to ${id}: ${text}`);
  } catch (err) {
    console.error("[SENDER ERROR]: Failed to send message", err);
  }
};
