const express = require("express");

const server = express();

server.use(express.json());

let blocks = [];

server.get("/api/blocks", (req, res) => {
  res.status(200).json(blocks);
});

module.exports = server;
