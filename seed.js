const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Quiz.deleteMany(); // clear old data

    await Quiz.insertMany([
      {
        title: "HTML Basics",
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Trainer Marking Language",
              "Hyper Text Markup Language",
              "Hyper Text Marketing Language",
              "Hyper Tool Multi Language"
            ],
            correctAnswer: 1
          },
          {
            question: "Which tag is used for the largest heading?",
            options: ["<h6>", "<head>", "<h1>", "<heading>"],
            correctAnswer: 2
          },
          {
            question: "What tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<hyperlink>"],
            correctAnswer: 1
          },
          {
            question: "Which attribute specifies an alternate text for an image?",
            options: ["alt", "src", "title", "href"],
            correctAnswer: 0
          },
          {
            question: "How do you create a list that is bulleted?",
            options: ["<ol>", "<ul>", "<dl>", "<li>"],
            correctAnswer: 1
          },
          {
            question: "Which element defines the title of a document?",
            options: ["<title>", "<head>", "<meta>", "<header>"],
            correctAnswer: 0
          },
          {
            question: "How do you insert a comment in HTML?",
            options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
            correctAnswer: 0
          },
          {
            question: "Which tag is used for inserting a line break?",
            options: ["<break>", "<br>", "<lb>", "<hr>"],
            correctAnswer: 1
          },
          {
            question: "Which tag is used to embed an image?",
            options: ["<img>", "<picture>", "<image>", "<src>"],
            correctAnswer: 0
          },
          {
            question: "Which HTML tag is used to define an unordered list?",
            options: ["<ul>", "<ol>", "<li>", "<list>"],
            correctAnswer: 0
          },
          {
            question: "Which tag is used to define a table row?",
            options: ["<td>", "<tr>", "<th>", "<table>"],
            correctAnswer: 1
          },
          {
            question: "How can you make a numbered list?",
            options: ["<list>", "<ol>", "<ul>", "<li>"],
            correctAnswer: 1
          },
          {
            question: "What is the correct HTML element for playing video?",
            options: ["<media>", "<video>", "<movie>", "<player>"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "CSS Fundamentals",
        questions: [
          {
            question: "Which property changes text color?",
            options: ["font-style", "color", "background-color", "text-color"],
            correctAnswer: 1
          },
          {
            question: "How do you make text bold in CSS?",
            options: ["font-weight: bold;", "text-weight: bold;", "font-style: bold;", "text-style: bold;"],
            correctAnswer: 0
          },
          {
            question: "Which property is used to change the background color?",
            options: ["bgcolor", "color", "background-color", "backgroundColor"],
            correctAnswer: 2
          },
          {
            question: "How do you select an element with id 'header'?",
            options: ["#header", ".header", "header", "*header"],
            correctAnswer: 0
          },
          {
            question: "How do you select elements with class name 'active'?",
            options: ["#active", ".active", "*active", "active"],
            correctAnswer: 1
          },
          {
            question: "Which CSS property controls the text size?",
            options: ["text-size", "font-style", "font-size", "text-style"],
            correctAnswer: 2
          },
          {
            question: "How do you add a comment in a CSS file?",
            options: ["// this is a comment", "/* this is a comment */", "<!-- this is a comment -->", "# this is a comment"],
            correctAnswer: 1
          },
          {
            question: "Which property is used to change the font of an element?",
            options: ["font-weight", "font-family", "font-style", "text-font"],
            correctAnswer: 1
          },
          {
            question: "What does 'padding' do in CSS?",
            options: ["Adds space outside the border", "Adds space inside the border", "Adds space between elements", "Changes the background"],
            correctAnswer: 1
          },
          {
            question: "Which property is used to control the element's margin?",
            options: ["padding", "border", "margin", "spacing"],
            correctAnswer: 2
          },
          {
            question: "How do you make a list not display bullets?",
            options: ["list-style: none;", "bullet: none;", "list-type: none;", "text-style: none;"],
            correctAnswer: 0
          },
          {
            question: "How do you make a class called 'menu'?",
            options: [".menu", "#menu", "*menu", "menu"],
            correctAnswer: 0
          },
          {
            question: "How do you apply a CSS rule only when the screen is smaller than 600px?",
            options: ["@media screen and (max-width: 600px)", "@media (min-width: 600px)", "@screen 600px", "@media (width: <600px)"],
            correctAnswer: 0
          }
        ]
      }
    ]);

    console.log("✅ Sample quizzes added!");
    process.exit();
  })
  .catch((err) => console.error(err));
