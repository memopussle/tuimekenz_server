const mongoose = require("mongoose");
const { Schema } = mongoose;

const tourSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  per: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Object, $date: String },
  img: { type: Array },
  duration: { type: String, required: true },
  ticket_type: { type: String, required: true },
  group_size: { type: Number, required: true },
  near_transport: { type: String, required: true },
  additional_info: { type: Array, required: true },
  tour_snapshot: { type: String, required: true },
  highlights: {type: Array, required: true}
});

const tour = mongoose.model("tours", tourSchema);

module.exports = tour;
