const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const askGemini = require("./services/ai");
const retrieveContext = require("./services/rag");

const app = express();

app.use(express.json());

let totalInputTokens = 0;
let totalOutputTokens = 0;

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body?.question;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        error: "Question cannot be empty."
      });
    }

    if (question.length > 500) {
      return res.status(400).json({
        error: "Question is too long."
      });
    }

    const context = await retrieveContext(question);

    const result = await askGemini(question, context);

    console.log(result);

    totalInputTokens += result.inputTokens;
    totalOutputTokens += result.outputTokens;

    console.log("--------------------------------");
    console.log("Input Tokens :", result.inputTokens);
    console.log("Output Tokens:", result.outputTokens);
    console.log("Running Input :", totalInputTokens);
    console.log("Running Output:", totalOutputTokens);
    console.log("--------------------------------");

    if (
      result.answer.toLowerCase().includes("i think") ||
      result.answer.toLowerCase().includes("maybe")
    ) {
      return res.json({
        answer:
          "Sorry, I couldn't find a reliable answer in the available documents."
      });
    }

    res.json({
      answer: result.answer
    });

  } catch (error) {

    console.error("FULL ERROR:");
    console.error(error);

    res.status(500).json({
      error: error.message,
      details: error
    });

  }
});

module.exports = app;