/**
 * Global Error Handler for Instagram Bot
 * Handles unhandled rejections and uncaught exceptions
 */

module.exports = () => {
  // Catch unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise);
    console.error("Reason:", reason);
  });

  // Catch uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
  });

  // Catch warnings (optional)
  process.on("warning", (warning) => {
    console.warn("⚠️ Warning:", warning.name, "-", warning.message);
  });

  console.log("✅ Global Error Handler initialized");
};
