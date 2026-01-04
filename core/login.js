const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
const path = require("path");
const config = require("../config");

const ig = new IgApiClient();
const SESSION_FILE = path.join(__dirname, "..", "ig-session.json");

async function login() {
  ig.state.generateDevice(config.IG_USERNAME);

  if (fs.existsSync(SESSION_FILE)) {
    console.log("♻️ Restoring Instagram session...");
    const session = JSON.parse(fs.readFileSync(SESSION_FILE));
    await ig.state.deserialize(session);
    return ig;
  }

  console.log("🔐 First time login...");
  await ig.account.login(
    config.IG_USERNAME,
    config.IG_PASSWORD
  );

  const serialized = await ig.state.serialize();
  delete serialized.constants;

  fs.writeFileSync(
    SESSION_FILE,
    JSON.stringify(serialized, null, 2)
  );

  console.log("✅ Session saved");
  return ig;
}

module.exports = login;
