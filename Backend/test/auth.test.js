const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {

  it("Should register user", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({

        name: "Test User",

        email: "test@gmail.com",

        password: "123456",

      });

    expect(res.statusCode).toBe(201);

  });

});