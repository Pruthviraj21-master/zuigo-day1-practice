const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function askGemini(question, context) {

  const systemPrompt = `
You are CreatorBridge Assistant.

Rules:
- Answer ONLY using the provided context.
- Never make up information.
- If the answer is not found in the context, reply exactly:
"I couldn't find that information in the CreatorBridge knowledge base."

Context:
${context}
`;

  const response = await ai.models.generateContent({
    model: process.env.MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}

Question:
${question}`
          }
        ]
      }
    ]
  });

  return {
    answer: response.text,

    inputTokens:
      response.usageMetadata?.promptTokenCount || 0,

    outputTokens:
      response.usageMetadata?.candidatesTokenCount || 0
  };

}

module.exports = askGemini;
