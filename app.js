const express = require("express");
const app = express();
const cors = require("cors");
const tours = require("./model/TourModel");
const validId = require("./utils/validId");
const path = require("path");
const bodyParser = require("body-parser");
const  mongoose  = require("mongoose");

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

// DELETE POST
app.delete("/tours/:id", async (req, res) => {
  const { id } = req.params;

  if (!validId(id)) return res.status(404).send("No post with that id");

  await tours.findByIdAndRemove(id);
  res.send({ message: "Tour deleted successfully" });
});


//EDIT POST
app.patch("/tours/:id", async (req, res) => {
  const { id: _id } = req.params; // rename id -> _id

  const tour = req.body;

  //if id is not valid
  if (!validId(_id))
    return res.status(404).send("No post with that id");

  const updatedTour = await tours.findByIdAndUpdate(
    _id,
    { ...tour, _id }, // update the post with the id
    { new: true }
  ); //update the new post by target the _id & post
  res.send(updatedTour);
 
})

app.use(express.static(path.join(__dirname + "/public")));

module.exports = app;
