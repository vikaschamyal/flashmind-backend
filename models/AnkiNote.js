const mongoose = require("mongoose");

const AnkiNoteSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ important to know which user created this
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("AnkiNote", AnkiNoteSchema);
