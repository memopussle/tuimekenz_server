
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

mongoose
  .connect(
    process.env.CONNECT_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo database");
  })
  .catch((err) => {
    console.error(err);
  });


app.listen(port, () => {
  console.log(`App listening on port 5000`);
});
