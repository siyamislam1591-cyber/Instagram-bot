const { IgApiClient } = require("nx-instagram-private-api");
const config = require("../config");

const ig = new IgApiClient();

async function login() {
  ig.state.generateDevice(config.IG_USERNAME);
  await ig.account.login(
    config.IG_USERNAME,
    config.IG_PASSWORD
  );
  console.log("✅ Xalman Instagram Login Successful");
  return ig;
}

module.exports = login;
