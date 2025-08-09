const Quiz = require("../models/Quiz");
const Leaderboard = require("../models/Leaderboard");
const User = require("../models/User"); // For username retrieval

// Get all quizzes (only title & description)
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title description");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get quiz by ID (full quiz with questions)
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Submit quiz answers and calculate score
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const detailedResults = quiz.questions.map((q) => {
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      const isCorrect = userAnswer && userAnswer.selectedOption === q.correctAnswer;
      if (isCorrect) score++;

      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswer ? userAnswer.selectedOption : null,
        isCorrect
      };
    });

    // Fetch user by ID from req.user (which is user ID string)
    const user = await User.findById(req.user).select("email");
    if (!user) return res.status(401).json({ message: "User not found" });

    // Save score with user email in leaderboard
    await Leaderboard.create({
      quizId: quiz._id,
      userId: user._id,
      username: user.email,   // storing email in username field for now
      score
    });

    res.json({
      score,
      total: quiz.questions.length,
      results: detailedResults
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get top 10 leaderboard for a quiz
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ quizId: req.params.id })
      .sort({ score: -1, createdAt: 1 })
      .limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getLeaderboard,
};
