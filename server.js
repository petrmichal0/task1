const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.error(`UNCAUGHT EXCEPTION! 💥 Vypínání...\n${err.stack}`);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`✅ Aplikace běží na portu ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UNHANDLED REJECTION! 💥 Vypínání...\n${err.stack}`);
  server.close(() => process.exit(1));
});
