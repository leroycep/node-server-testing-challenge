const request = require("supertest");
const server = require("./server.js");
const model = require("./model.js");

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
    beforeEach(() => {
      model.blocks = [];
    });

    it("should return 400 error if a required field is missing", async () => {
      const response = await request(server)
        .post("/api/blocks")
        .send({ name: undefined, color: "grey", solid: true });
      expect(response.status).toEqual(400);
    });

    it("should return 400 error if an unknown field is included", async () => {
      const response = await request(server).post("/api/blocks").send({
        name: "stone",
        color: "grey",
        solid: true,
        nonexistantField: true,
      });
      expect(response.status).toEqual(400);
    });

    it("should return 400 error if id field is included", async () => {
      const response = await request(server).post("/api/blocks").send({
        id: 1337,
        name: "stone",
        color: "grey",
        solid: true,
      });
      expect(response.status).toEqual(400);
    });

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

    it("should add the block to the list of all blocks", async () => {
      const pre_existing_blocks = model.blocks.filter(
        (block) => block.name === newblock.name
      );
      expect(pre_existing_blocks).toHaveLength(0);

      const response = await request(server).post("/api/blocks").send(newblock);

      const matching_blocks = model.blocks.filter(
        (block) => block.name === newblock.name
      );
      expect(matching_blocks).toHaveLength(1);
    });

    it("should reject duplicate block names", async () => {
      model.blocks = [newblock];

      const response = await request(server).post("/api/blocks").send(newblock);

      expect(response.status).toEqual(400);
    });
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
    const diamondBlock = {
      id: 10,
      name: "diamond block",
      color: "blue",
      solid: true,
    };

    beforeEach(() => {
      model.blocks = [diamondBlock];
    });

    it("should return 404 error if specified block does not exist", async () => {
      const response = await request(server).delete("/api/blocks/5");
      expect(response.status).toEqual(404);
    });

    it("should return a status code of 200", async () => {
      const response = await request(server).delete(
        `/api/blocks/${diamondBlock.id}`
      );
      expect(response.status).toEqual(200);
    });

    it("should return the deleted block", async () => {
      const response = await request(server).delete(
        `/api/blocks/${diamondBlock.id}`
      );
      expect(response.body).toEqual(diamondBlock);
    });
  });
});
