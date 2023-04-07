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
      required: true,
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
    proposalSent: Boolean,
    proposalSentAt: Date,
    quoteSent: Boolean,
    quoteSentAt: Date,
    quote: {
      type: Schema.Types.ObjectId,
      ref: "Quote"
    },
    isLead: {
      type: Boolean,
      default: true
    },
    isCustomer: Boolean,
    billingId: String
  },
  { timestamps: true }
);
