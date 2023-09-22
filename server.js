const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./backend/app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION!!!!  Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database connection successful");
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
