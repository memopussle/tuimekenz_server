const express = require("express");
const app = express();
const cors = require("cors");
const tours = require("./model/TourModel");
const validId = require("./utils/validId");
const path = require("path");

app.use(cors());
app.use(express.json());

app.get("/tours", async (req, res) => {
  const tourList = await tours.find({});

  return res.status(200).send(tourList);
});

app.get("/tours/:id", async (req, res) => {
  const idParam = req.params.id;
  const itIsValidId = validId(idParam);

  
  if (itIsValidId === false) {
    return res.status(400).send({ message: "id provided is invalid" });
  }

  const tourById = await tours.findById(idParam);
   if (!tourById) {
     return res.status(404).send({ message: "id not found" });
   }


  return res.status(200).send(tourById);
});

app.use(express.static(path.join(__dirname + "/public")));

module.exports = app;
