const mongoose = require("mongoose");

const { Schema } = mongoose;

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Email", "Call", "Meeting"],
      required: true
    },
    notes: {
      type: String
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File"
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
