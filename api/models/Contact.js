const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    activityHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity"
      }
    ],
    proposalSent: {
      type: Boolean,
      default: false
    },
    proposalSentAt: Date,
    quoteSent: {
      type: Boolean,
      default: false
    },
    quoteSentAt: Date,
    quote: {
      type: Schema.Types.ObjectId,
      ref: "Quote"
    },
    status: {
      type: String,
      enum: ["Lead", "Proposal", "Quote", "Won", "Lost"]
    },
    billingId: String,
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
