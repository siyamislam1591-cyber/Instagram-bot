const login = require("./core/login");
const startListener = require("./core/listener");

(async () => {
  const ig = await login();
  startListener(ig);
})();
