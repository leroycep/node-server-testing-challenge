const express = require("express");

const model = require("./model.js");
const server = express();

server.use(express.json());

server.get("/api/blocks", (req, res) => {
  res.status(200).json(model.blocks);
});

server.post("/api/blocks", (req, res) => {
  const requiredValues = ["name", "color", "solid"];
  const bodyKeys = Object.keys(req.body);
  if (!requiredValues.every((val) => bodyKeys.includes(val))) {
    res
      .status(400)
      .json({ errorMessage: "'name', 'color', and 'solid' must be defined" });
    return;
  }

  if (model.blocks.findIndex((block) => block.name === req.body.name) !== -1) {
    res.status(400).json({ errorMessage: "duplicate name" });
    return;
  }

  const block = {
    ...req.body,
    id: model.nextId,
  };
  model.nextId += 1;
  model.blocks.push(block);
  res.status(201).json(block);
});

server.delete("/api/blocks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const blockIdx = model.blocks.findIndex((block) => block.id === id);
  if (blockIdx === -1) {
    res.status(404).json({ errorMessage: "specified block not found" });
    return;
  }

  const blocks = model.blocks.splice(blockIdx, 1);
  res.status(200).json(blocks[0]);
});

module.exports = server;
