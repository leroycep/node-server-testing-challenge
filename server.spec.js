const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
  describe("GET /api/blocks", () => {
    it("should return a status code of 200", async () => {
      const response = await request(server).get("/api/blocks");
      expect(response.status).toEqual(200);
    });
    it("should return a list of blocks", async () => {
      const response = await request(server).get("/api/blocks");
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe("POST /api/blocks", () => {
    it("should return 400 error if a required field is missing", async () => {
      const response = await request(server)
        .post("/api/blocks")
        .send({ name: undefined, color: "grey", solid: true });
      expect(response.status).toEqual(400);
    });
    it.todo("should return 400 error if an invalid field is included");

    const newblock = { name: "stone", color: "grey", solid: true };

    it("should return a status code of 201", async () => {
      const response = await request(server).post("/api/blocks").send(newblock);
      expect(response.status).toEqual(201);
    });

    it("should return the newly created block", async () => {
      const response = await request(server).post("/api/blocks").send(newblock);

      expect(response.body.name).toEqual(newblock.name);
      expect(response.body.color).toEqual(newblock.color);
      expect(response.body.solid).toEqual(newblock.solid);
      expect(response.body.id).toBeTruthy();
    });

    it.todo("should add the block to the list of all blocks");
    it.todo("should reject duplicate block names");
  });
  describe("PUT /api/blocks/:id", () => {
    it.todo("should return 400 error if a required field is missing");
    it.todo("should return 400 error if an invalid field is included");
    it.todo("should return 404 error if specified block does not exist");
    it.todo("should return a status code of 201");
    it.todo("should return the updated block");
    it.todo("should reject duplicate block names");
  });
  describe("DELETE /api/blocks/:id", () => {
    it.todo("should return 404 error if specified block does not exist");
    it.todo("should return a status code of 200");
    it.todo("should return the deleted block");
  });
});
