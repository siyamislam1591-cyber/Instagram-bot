const login = require("./core/login");
const startListener = require("./core/listener");

(async () => {
  try {
    const ig = await login();
    startListener(ig);
  } catch (err) {
    console.error("Bot initialization failed:", err);
  }
})();
