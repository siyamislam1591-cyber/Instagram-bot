// config.js
module.exports = {
  // ===============================
  // Instagram Account Credentials
  // ===============================
  IG: {
    USERNAME: "phantom_99xs",
    PASSWORD: "phantom12@#",

    // For accounts with 2FA
    TWO_FACTOR_CODE: null, // If your account has 2FA, put the code here
    SAVE_SESSION: true     // Prevents logging in every time
  },

  // ===============================
  // Bot Settings
  // ===============================
  BOT: {
    PREFIX: "/",                // Command prefix
    OWNER_NAME: "Siyam Rohman", // Your name
    BOT_NAME: "maiko",  // Bot name
    TIMEZONE: "Asia/Dhaka"      // Timezone for logging or scheduling
  },

  // ===============================
  // Admin Control
  // ===============================
  ADMINS: [
    "61584749395355" // Instagram User ID of admins
  ],

  // ===============================
  // Puppeteer / Login Settings
  // ===============================
  LOGIN: {
    HEADLESS: false,            // true = browser hidden, false = visible
    SLOW_MO: 50,                // human-like delay
    MAX_RETRY: 3,               // retry login on failure
    LOGIN_TIMEOUT: 60000        // 60 seconds
  },

  // ===============================
  // Anti-Ban / Safety
  // ===============================
  SECURITY: {
    RANDOM_DELAY: true,         // random delay between actions
    MIN_DELAY: 3000,            // 3 seconds minimum
    MAX_DELAY: 7000,            // 7 seconds maximum
    AUTO_LOGOUT_ON_ERROR: true  // logout if something goes wrong
  },

  // ===============================
  // Logging
  // ===============================
  LOG: {
    ENABLED: true,
    LEVEL: "info" // "info" | "warn" | "error" | "debug"
  }
};
