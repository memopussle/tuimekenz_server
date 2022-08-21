const mongoose = require("mongoose");
const { Schema } = mongoose;

const tourSchema = new Schema({
  title: String,
  price: { type: Number,  min:0 },
  per: Number,
  description: String,
  date: { type: Date, default: Date.now },
  img:[String],
  duration: String,
  ticket_type: String,
  group_size: { type: Number, min: 0},
  near_transport: String,
  additional_info: [String],
  tour_snapshot: String,
  highlights:[String],

});

const tour = mongoose.model("tours", tourSchema);

module.exports = tour;
