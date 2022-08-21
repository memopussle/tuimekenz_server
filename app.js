const express = require("express");
const app = express();
const cors = require("cors");
const tours = require("./model/TourModel");
const validId = require("./utils/validId");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000,
  })
);

// GET METHOD
app.get("/tours", async (req, res) => {
  const tourList = await tours.find({});

  return res.status(200).send(tourList);
});

// GET EACH ID
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

// POST METHOD
app.post("/tours", async (req, res, next) => {
  try {
    const { body } = req;
    const newTour = new tours(body);
    await newTour.save();
    return res.status(201).send(newTour);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.use(express.static(path.join(__dirname + "/public")));

module.exports = app;
