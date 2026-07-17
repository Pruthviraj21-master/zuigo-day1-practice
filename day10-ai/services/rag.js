const fs = require("fs");
const path = require("path");

const createEmbedding = require("./embedding");
const cosineSimilarity = require("../utils/cosine");

async function retrieveContext(question) {

  const docsFolder = path.join(__dirname, "../docs");

  const files = fs.readdirSync(docsFolder);

  const questionVector = createEmbedding(question);

  let bestDocument = "";
  let highestScore = -1;

  for (const file of files) {

    const content = fs.readFileSync(
      path.join(docsFolder, file),
      "utf8"
    );

    const documentVector = createEmbedding(content);

    const similarity = cosineSimilarity(
      questionVector,
      documentVector
    );

    console.log(file, similarity);

    if (similarity > highestScore) {

      highestScore = similarity;
      bestDocument = content;

    }

  }
  console.log("Best Score:", highestScore);
  console.log("Best Document:", bestDocument);

  return bestDocument;

}

module.exports = retrieveContext;