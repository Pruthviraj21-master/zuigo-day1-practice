function cosineSimilarity(vectorA, vectorB) {

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  const keys = new Set([
    ...Object.keys(vectorA),
    ...Object.keys(vectorB)
  ]);

  for (const key of keys) {

    const a = vectorA[key] || 0;
    const b = vectorB[key] || 0;

    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

module.exports = cosineSimilarity;