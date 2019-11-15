const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("Server.js testing", () => {
  describe("GET /", () => {
    it("Should return status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("Should return JSON format", async () => {
      const res = await request(server).get("/");
      expect(res.type).toMatch(/json/i);
    });
  });

  describe("POST /register", () => {
    describe("Add a new user", () => {
      beforeEach(async () => {
        await db("users").truncate();
      });

      it("Should return status 200", async () => {
        const res = await request(server)
          .post("/api/auth/register")
          .send({ username: "Lord Viper", password: "ViperRapper" });

        expect(res.status).toBe(200);
      });

      it("Should pass validation", async () => {
        const res = await request(server)
          .post("/api/auth/register")
          .send({ username: "Lord Viper", password: "ViperRapper" });
        // .send({ username: "Fail", password: "ViperRapper" });

        expect(res.body.error).toBe(undefined);
        // expect(res.body.error).toHaveLength(1);
      });
    });
  });

  describe("POST /login", () => {
    describe("Login", () => {
      it("Should return status 200", async () => {
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "Lord Viper", password: "ViperRapper" });

        expect(res.status).toBe(200);
      });

      it("Should return JSON", async () => {
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "Lord Viper", password: "ViperRapper" });

        expect(res.type).toMatch(/json/i);
      });
    });
  });
});
