describe("Question Validation", () => {

  function validate(question) {

    if (!question || question.trim() === "") {
      return "Question cannot be empty.";
    }

    if (question.length > 500) {
      return "Question is too long.";
    }

    return "Valid";

  }

  test("rejects empty question", () => {

    expect(validate("")).toBe("Question cannot be empty.");

  });

  test("rejects long question", () => {

    expect(validate("A".repeat(501))).toBe("Question is too long.");

  });

  test("accepts valid question", () => {

    expect(validate("How do I apply?")).toBe("Valid");

  });

});