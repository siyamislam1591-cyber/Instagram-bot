const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
const path = require("path");
const config = require("../config");

const ig = new IgApiClient();
const SESSION_FILE = path.join(__dirname, "..", "ig-session.json");

async function login() {
  try {
    // Flexible: username/email
    const loginName = config.IG.LOGIN_TYPE === "email"
      ? config.IG.EMAIL
      : config.IG.USERNAME;

    if (!loginName || !config.IG.PASSWORD) {
      throw new Error("Instagram login credentials missing!");
    }

    // Generate device based on login name
    ig.state.generateDevice(loginName);

    // Restore session if exists
    if (fs.existsSync(SESSION_FILE)) {
      console.log("♻️ Restoring Instagram session...");
      try {
        const session = JSON.parse(fs.readFileSync(SESSION_FILE, "utf-8"));
        await ig.state.deserialize(session);
        return ig;
      } catch (err) {
        console.warn("[SESSION ERROR] Failed to restore session, will login fresh:", err);
      }
    }

    // First-time login
    console.log("🔐 Logging in to Instagram...");
    await ig.account.login(loginName, config.IG.PASSWORD);

    // Save session
    const serialized = await ig.state.serialize();
    delete serialized.constants; // prevent circular structure

    fs.writeFileSync(SESSION_FILE, JSON.stringify(serialized, null, 2), "utf-8");
    console.log("✅ Session saved");

    return ig;

  } catch (err) {
    console.error("[LOGIN ERROR]:", err);
    throw err; // rethrow so bot knows login failed
  }
}

module.exports = login;
