const express = require("express");
const {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getLeaderboard,
} = require("../controllers/quizControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/:id/submit", protect, submitQuiz);
router.get("/:id/leaderboard", protect, getLeaderboard);

module.exports = router;
