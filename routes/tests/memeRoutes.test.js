import request from "supertest";
import app from "../index.js";

describe("Meme like/unlike routes", () => {
  let token;
  let memeId = 1;

  beforeAll(async () => {
    await request(app).post("/auth/register").send({
      username: "tester",
      password: "password123",
    });

    const res = await request(app).post("/auth/login").send({
      username: "tester",
      password: "password123",
    });

    token = res.body.token;
  });

  test("User can like a meme", async () => {
    const res = await request(app)
      .post(`/memes/${memeId}/like`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("User can unlike a meme", async () => {
    const res = await request(app)
      .post(`/memes/${memeId}/unlike`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Unliked successfully");
  });
});
