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
    phoneNumber: String,
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
    isLead: {
      type: Boolean,
      default: true
    },
    isCustomer: {
      type: Boolean,
      default: false
    },
    billingId: String
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
