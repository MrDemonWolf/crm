const Mongosoe = require("mongoose");

const { Schema } = Mongosoe;

const noteSchema = new Schema(
  {
    note: {
      type: String,
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact"
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongosoe.model("Note", noteSchema);
