describe("server", () => {
  describe("GET /api/blocks", () => {
    it.todo("should return a status code of 200");
    it.todo("should return a list of blocks");
  });
  describe("POST /api/blocks", () => {
    it.todo("should return 400 error if a required field is missing");
    it.todo("should return 400 error if an invalid field is included");
    it.todo("should return a status code of 201");
    it.todo("should return the newly created block");
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
