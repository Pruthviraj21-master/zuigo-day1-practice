function createEmbedding(text) {

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const vector = {};

  for (const word of words) {

    if (word.length < 3) continue;

    vector[word] = (vector[word] || 0) + 1;
  }

  return vector;
}

module.exports = createEmbedding;