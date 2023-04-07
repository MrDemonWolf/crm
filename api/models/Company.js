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
    phoneNumber: {
      type: String,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Company", companySchema);
