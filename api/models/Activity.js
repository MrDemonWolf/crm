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
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Activity", activitySchema);
