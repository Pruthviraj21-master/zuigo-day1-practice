const cosineSimilarity = require("../utils/cosine");

describe("Cosine Similarity", () => {

  test("returns 1 for identical vectors", () => {

    const vectorA = { hello: 1, world: 2 };
    const vectorB = { hello: 1, world: 2 };

    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(1);

  });

  test("returns 0 for empty vectors", () => {

    expect(cosineSimilarity({}, {})).toBe(0);

  });

  test("returns value between 0 and 1", () => {

    const vectorA = { apple: 2 };
    const vectorB = { apple: 1, banana: 3 };

    const result = cosineSimilarity(vectorA, vectorB);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);

  });

});