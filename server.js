const express = require("express");

const server = express();

server.use(express.json());

let blocks = [];
let nextId = 1;

server.get("/api/blocks", (req, res) => {
  res.status(200).json(blocks);
});

server.post("/api/blocks", (req, res) => {
  const block = {
    ...req.body,
    id: nextId,
  };
  nextId += 1;
  blocks.push(block);
  res.status(201).json(block);
});

module.exports = server;
