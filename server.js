const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = require("./app");
const uri = process.env.MONGODB_URI;
mongoose.connect(
  "mongodb+srv://thugiang:gianganhthu7b..@cluster0.tupwf3g.mongodb.net/mongo?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.listen(port, () => {
  console.log(`App listening on port 5000`);
});
