const { IgApiClient } = require("instagram-private-api");
const fs = require("fs-extra");
const path = require("path");

const ig = new IgApiClient();
const SESSION_FILE = path.join(__dirname, "../data/session.json");

async function Instagramlogin(username, password) {
  ig.state.generateDevice(username);

  // 🔁 আগের session থাকলে load করবে
  if (fs.existsSync(SESSION_FILE)) {
    const session = fs.readJsonSync(SESSION_FILE);
    await ig.state.deserialize(session);
    console.log("✅ Session loaded");
    return ig;
  }

  // 🔐 নতুন login
  await ig.account.login(username, password);
  console.log("✅ Login successful");

  // 💾 session save
  const state = await ig.state.serialize();
  delete state.constants;
  fs.writeJsonSync(SESSION_FILE, state);

  console.log("💾 Session saved");
  return ig;
}

module.exports = Instagramlogin;
