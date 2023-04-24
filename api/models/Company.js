const mongoose = require("mongoose");

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact"
    },
    name: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    website: String,
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

mongoose.set("debug", true);

module.exports = mongoose.model("Company", companySchema);
