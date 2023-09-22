const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./backend/app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION!!!!  Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(port, () => {
  console.log("Server is listening on port 3000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION!!!!  Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});
