const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = require("./app");
mongoose
  .connect("mongodb://localhost:27017/mongo")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));



app.listen(port, () => {
  console.log(`App listening on port 5000`);
});
