// backend/routes/ankiRoutes.js

const express = require("express");
const router = express.Router();
const AnkiNote = require("../models/AnkiNote");
const authMiddleware = require("../middleware/authMiddleware");

//test routes

router.get("/test", (req, res) => {
  res.send("Anki route is working!");
});


// GET all notes for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await AnkiNote.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new note
router.post("/", authMiddleware, async (req, res) => {
  const { front, back } = req.body;
  try {
    const newNote = new AnkiNote({ front, back, user: req.user });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a note
router.put("/:id", authMiddleware, async (req, res) => {
  const { front, back } = req.body;
  try {
    const note = await AnkiNote.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // ✅ ensure only user's note is updated
      { front, back },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await AnkiNote.findOneAndDelete({
      _id: req.params.id,
      user: req.user, // ✅ make sure user can only delete their own notes
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
