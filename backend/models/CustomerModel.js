const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
