const express = require("express");

const server = express();

server.use(express.json());

let blocks = [];

server.get("/api/blocks", (req, res) => {
  res.status(200).json(blocks);
});

server.post("/api/blocks", (req, res) => {
  blocks.push(req.body);
  res.status(201).json(req.body);
});

module.exports = server;
