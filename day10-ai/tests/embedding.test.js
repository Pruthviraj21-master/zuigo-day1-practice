const createEmbedding = require("../services/embedding");

describe("Embedding Function", () => {

  test("creates an object", () => {

    const result = createEmbedding("Hello world");

    expect(typeof result).toBe("object");

  });

  test("ignores punctuation", () => {

    const result = createEmbedding("Hello, world!");

    expect(result.hello).toBe(1);
    expect(result.world).toBe(1);

  });

  test("ignores short words", () => {

    const result = createEmbedding("I am a creator");

    expect(result.creator).toBe(1);
    expect(result.am).toBeUndefined();
    expect(result.i).toBeUndefined();

  });

});