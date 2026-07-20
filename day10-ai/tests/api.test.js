const request = require("supertest");
const app = require("../app");

describe("POST /api/ask", () => {

  test("rejects an empty question", async () => {

    const response = await request(app)
      .post("/api/ask")
      .send({
        question: ""
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.error).toBe(
      "Question cannot be empty."
    );

  });

  test("rejects questions over 500 characters", async () => {

    const response = await request(app)
      .post("/api/ask")
      .send({
        question: "A".repeat(501)
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.error).toBe(
      "Question is too long."
    );

  });

  test("accepts a valid request", async () => {

    const response = await request(app)
      .post("/api/ask")
      .send({
        question: "How do creators apply?"
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("answer");

  });

});