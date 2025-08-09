const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
