const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const fileSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true
  },
  fileId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid()
  },
  name: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
