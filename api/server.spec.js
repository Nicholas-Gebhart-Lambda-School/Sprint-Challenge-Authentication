const request = require("supertest");
const server = require("./server");

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
});
