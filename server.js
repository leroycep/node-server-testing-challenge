const express = require("express");

const server = express();

server.use(express.json());

let blocks = [];
let nextId = 1;

server.get("/api/blocks", (req, res) => {
  res.status(200).json(blocks);
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

  const block = {
    ...req.body,
    id: nextId,
  };
  nextId += 1;
  blocks.push(block);
  res.status(201).json(block);
});

module.exports = server;
