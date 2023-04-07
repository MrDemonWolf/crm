const mongoose = require("mongoose");

const { Schema } = mongoose;

const quoteSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  products: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      price: {
        type: Number,
        required: true
      },
      isOngoingCost: {
        type: Boolean,
        default: false
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quote", quoteSchema);
