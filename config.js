// config.js
module.exports = {
  // ===============================
  // Instagram Account
  // ===============================
  IG: {
    EMAIL: "siyamrohman159@gmail.com",        // Your Instagram email
    USERNAME: "Phantom_99xs",             // Your Instagram username (optional)
    PASSWORD: "phantom12@#",           // Your password
    LOGIN_TYPE: "email",                // "email" or "username"
    SAVE_SESSION: true,                 // Save session to avoid repeated login
    TWO_FACTOR_CODE: null               // 2FA code if enabled
  },
  
//siyam your father 
  
  // ===============================
  // Bot Settings
  // ===============================
  BOT: {
    NAME: "maiko",
    OWNER: "Siyam Rohman",
    PREFIX: "/",
    TIMEZONE: "Asia/Dhaka"
  },

  // ===============================
  // Admins uid
  // ===============================
  ADMINS: ["61584749395355"],

  // ===============================
  // Puppeteer Settings
  // ===============================
  LOGIN: {
    HEADLESS: false,
    SLOW_MO: 80,
    TIMEOUT: 60000,
    MAX_RETRY: 3
  },

  // ===============================
  // Anti-Ban Safety
  // ===============================
  SECURITY: {
    RANDOM_DELAY: true,
    MIN_DELAY: 4000,
    MAX_DELAY: 8000,
    AUTO_LOGOUT_ON_ERROR: true
  },

  // ===============================
  // Logging
  // ===============================
  LOG: {
    ENABLED: true,
    LEVEL: "info" // info | warn | error | debug
  }
};
